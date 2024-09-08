exports.up = function (knex) {
  const createViewUsersList = `
CREATE OR REPLACE VIEW USERS_LIST AS
SELECT 
    u.user_id, 
    CONCAT(u.first_name, ' ', u.last_name) AS user_name, 
    u.email AS user_email, 
    r.name AS user_role, 
    m.user_id AS manager_user_id, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name, 
    m.email AS manager_email
FROM 
    USERS u
LEFT JOIN 
    USERS m ON u.manager_user_id = m.user_id
JOIN 
    ROLES r ON u.role_id = r.role_id
;`;

  const createViewStatusCurrent = `
CREATE OR REPLACE VIEW STATUS_CURRENT AS
SELECT
    t.ticket_id,
    s.status_id,
    s.name status,
    sh.created_at
FROM tickets t JOIN
    status_history sh ON sh.ticket_id = t.ticket_id JOIN
    status s ON s.status_id = sh.status_id
WHERE sh.created_at = (
        SELECT MAX(sh2.created_at)
        FROM status_history sh2
        WHERE sh2.ticket_id = t.ticket_id
    )
;`;

  const createViewPrioritiesCurrent = `
CREATE OR REPLACE VIEW PRIORITIES_CURRENT AS
SELECT
    t.ticket_id,
    p.priority_id,
    p.name priority,
    ph.created_at
FROM tickets t JOIN
    priority_history ph ON ph.ticket_id = t.ticket_id JOIN
    priorities p ON p.priority_id = ph.priority_id
WHERE ph.created_at = (
        SELECT MAX(ph2.created_at)
        FROM priority_history ph2
        WHERE ph2.ticket_id = t.ticket_id
    )
;`;

  const createViewAssignCurrent = `
CREATE OR REPLACE VIEW ASSIGN_CURRENT AS
SELECT
    t.ticket_id,
    ah.assign_user_id,
    u.first_name, 
    u.last_name,
    u.email,
    ah.created_at
FROM tickets t JOIN
    assign_history ah ON t.ticket_id = ah.ticket_id JOIN
    users u ON ah.assign_user_id = u.user_id
WHERE ah.created_at = (
        SELECT MAX(ah2.created_at)
        FROM assign_history ah2
        WHERE ah2.ticket_id = t.ticket_id
    )
;`;

  const createViewTicketsCurrent = `
CREATE OR REPLACE VIEW TICKETS_CURRENT AS
SELECT
    t.ticket_id, 
    t.title,
    t.description,
    t.created_by_user_id as created_user_id,
    uc.email as created_email,
    t.created_at, 
    GREATEST(MAX(sc.created_at), MAX(pc.created_at), COALESCE(MAX(ac.created_at), t.created_at), COALESCE(MAX(c.created_at), t.created_at)) as last_change_date, 
    MAX(sc.status_id) as status_id, 
    MAX(sc.status) as status, 
    MAX(pc.priority_id) as priority_id, 
    MAX(pc.priority) as priority, 
    MAX(ac.assign_user_id) as assign_user_id, 
    MAX(ac.first_name) as assign_first_name, 
    MAX(ac.last_name) as assign_last_name,
    MAX(ac.email) as assign_email
FROM TICKETS t 
JOIN USERS uc ON t.created_by_user_id = uc.user_id 
JOIN STATUS_CURRENT sc ON t.ticket_id = sc.ticket_id 
JOIN PRIORITIES_CURRENT pc ON t.ticket_id = pc.ticket_id 
LEFT OUTER JOIN ASSIGN_CURRENT ac ON t.ticket_id = ac.ticket_id 
LEFT OUTER JOIN COMMENTS c ON t.ticket_id = c.ticket_id
GROUP BY 
    t.ticket_id, 
    t.title,
    t.description,
    t.created_by_user_id,
    uc.email,
    t.created_at
;`;

  const createViewStatusSummary = `
CREATE OR REPLACE VIEW STATUS_SUMMARY AS
WITH TicketCounts AS (
    SELECT 
        status, 
        COUNT(9) AS tickets
    FROM 
        tickets_current
    GROUP BY 
        status
        ORDER BY status
)
SELECT 
    status as name,
    tickets,
    ROUND(tickets * 100.0 / SUM(tickets) OVER (), 2) AS percentage
FROM 
    TicketCounts
;`;

  const createViewPrioritySummary = `
CREATE OR REPLACE VIEW PRIORITY_SUMMARY AS    
WITH TicketCounts AS (
    SELECT 
        priority, 
        COUNT(9) AS tickets
    FROM 
        tickets_current
    GROUP BY 
        priority
        ORDER BY priority
)
SELECT 
    priority as name,
    tickets,
    ROUND(tickets * 100.0 / SUM(tickets) OVER (), 2) AS percentage
FROM 
    TicketCounts
;`;

  const createViewCommentsHistory = `
CREATE OR REPLACE VIEW COMMENTS_HISTORY AS    
SELECT
    c.comment_id, 
    c.ticket_id, 
    c.comments, 
    c.created_at, 
    CONCAT(u.first_name, " ", u.last_name) as comments_by_name, 
    c.comments_by_user_id,
    r.role_id as comments_by_role_id,
    r.name as comments_by_role_name
FROM COMMENTS c JOIN
    USERS u ON c.comments_by_user_id = u.user_id JOIN
    ROLES r ON u.role_id = r.role_id
;`;

  const createViewTicketsTimeline = `
CREATE OR REPLACE VIEW TICKETS_TIMELINE AS
SELECT
    t.ticket_id,
    "STATUS" as category,
    s.name,
    sh.created_at
FROM tickets t JOIN
    status_history sh ON t.ticket_id = sh.ticket_id JOIN
    status s ON sh.status_id = s.status_id
UNION
SELECT
    t.ticket_id,
    "PRIORITY" as category,
    p.name,
    ph.created_at
FROM tickets t JOIN
    priority_history ph ON t.ticket_id = ph.ticket_id JOIN
    priorities p ON ph.priority_id = p.priority_id
UNION
SELECT
    t.ticket_id,
    "ASSIGN" as category,
    CONCAT(u.first_name, " ", u.last_name),
    ah.created_at
FROM tickets t JOIN
    assign_history ah ON t.ticket_id = ah.ticket_id JOIN
    users u ON ah.assign_user_id = u.user_id
UNION
SELECT
    ticket_id,
    "COMMENT" as category,
    comments_by_name,
    created_at
FROM comments_history
;`;

  return knex.schema
    .raw(createViewUsersList)
    .raw(createViewStatusCurrent)
    .raw(createViewPrioritiesCurrent)
    .raw(createViewAssignCurrent)
    .raw(createViewTicketsCurrent)
    .raw(createViewStatusSummary)
    .raw(createViewPrioritySummary)
    .raw(createViewCommentsHistory)
    .raw(createViewTicketsTimeline);
};

exports.down = function (knex) {
  const dropViewUsersList = `DROP VIEW IF EXISTS USERS_LIST;`;
  const dropViewStatusCurrent = `DROP VIEW IF EXISTS STATUS_CURRENT;`;
  const dropViewPrioritiesCurrent = `DROP VIEW IF EXISTS PRIORITIES_CURRENT;`;
  const dropViewAssignCurrent = `DROP VIEW IF EXISTS ASSIGN_CURRENT;`;
  const dropViewTicketsCurrent = `DROP VIEW IF EXISTS TICKETS_CURRENT;`;
  const dropViewStatusSummary = `DROP VIEW IF EXISTS STATUS_SUMMARY;`;
  const dropViewPrioritySummary = `DROP VIEW IF EXISTS PRIORITY_SUMMARY;`;
  const dropViewCommentsHistory = `DROP VIEW IF EXISTS COMMENTS_HISTORY;`;
  const dropViewTicketsTimeline = `DROP VIEW IF EXISTS TICKETS_TIMELINE;`;

  return knex.schema
    .raw(dropViewUsersList)
    .raw(dropViewStatusCurrent)
    .raw(dropViewPrioritiesCurrent)
    .raw(dropViewAssignCurrent)
    .raw(dropViewTicketsCurrent)
    .raw(dropViewStatusSummary)
    .raw(dropViewPrioritySummary)
    .raw(dropViewCommentsHistory)
    .raw(dropViewTicketsTimeline);
};
