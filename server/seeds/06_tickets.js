exports.seed = async function (knex) {
  await knex("tickets").del();
  await knex("tickets").insert([
    {
      ticket_id: 1,
      title: "Unable to connect to VPN",
      description:
        "I'm having trouble connecting to the VPN. Every time I try to establish a connection, I receive an error message that prevents me from accessing our secure remote network. This issue is critical as it is blocking my ability to work remotely and access internal resources. Could you please assist in resolving this problem as soon as possible?",
      created_by_user_id: 11,
      created_at: "2024-08-01 09:00:00",
    },
    {
      ticket_id: 2,
      title: "Printer not working",
      description:
        "The office printer isn't responding at all. Ive tried sending print jobs multiple times, but the printer does not power on or acknowledge the commands. This is causing a backlog of documents that need to be printed urgently. Can someone look into this issue and get the printer operational again?",
      created_by_user_id: 11,
      created_at: "2024-08-01 10:30:00",
    },
    {
      ticket_id: 3,
      title: "Slow internet connection",
      description:
        "My internet connection is extremely slow today. The speed is so sluggish that its affecting my ability to browse the web, check emails, and complete online tasks efficiently. This slowdown is significantly impacting my productivity. Can you please investigate and resolve the issue?",
      created_by_user_id: 11,
      created_at: "2024-08-02 08:45:00",
    },
    {
      ticket_id: 4,
      title: "Software installation request",
      description:
        "I need Adobe Photoshop installed on my computer. This software is essential for my graphic design work, and I require it to perform tasks that are critical to my current projects. Could you please assist with the installation at your earliest convenience?",
      created_by_user_id: 11,
      created_at: "2024-08-02 11:00:00",
    },
    {
      ticket_id: 5,
      title: "Email not syncing",
      description:
        "Outlook is not syncing with the email server properly. Im not receiving new emails, and my sent messages are not showing up in my sent items. This issue is disrupting my communication and workflow. Could someone help troubleshoot and fix the syncing problem?",
      created_by_user_id: 11,
      created_at: "2024-08-02 14:15:00",
    },
    {
      ticket_id: 6,
      title: "Laptop overheating",
      description:
        "My laptop is getting excessively hot during use. It becomes so warm that it is uncomfortable to touch and Im worried it might cause long-term damage. This overheating is also affecting the laptop's performance. Can you please check this issue and suggest a solution?",
      created_by_user_id: 12,
      created_at: "2024-08-03 09:00:00",
    },
    {
      ticket_id: 7,
      title: "Can't access shared drive",
      description:
        "I am currently unable to access the shared network drive that I use for storing and retrieving files. This is preventing me from accessing important documents and collaborating with my team. Can you please resolve this access issue as quickly as possible?",
      created_by_user_id: 12,
      created_at: "2024-08-03 10:00:00",
    },
    {
      ticket_id: 8,
      title: "Computer won't boot",
      description:
        "My computer is stuck on the boot screen and won't proceed to start up the operating system. Im unable to use the computer for any work tasks because its not loading past this point. Can someone look into this issue and help me get the computer up and running?",
      created_by_user_id: 12,
      created_at: "2024-08-04 08:00:00",
    },
    {
      ticket_id: 9,
      title: "Password reset request",
      description:
        "Ive forgotten my account password and need to reset it. Im currently locked out of my account and cannot access any of my files or applications. Can you assist me in resetting my password and regaining access?",
      created_by_user_id: 12,
      created_at: "2024-08-04 09:15:00",
    },
    {
      ticket_id: 10,
      title: "Monitor flickering",
      description:
        "My monitor is flickering intermittently. This flickering is not only distracting but also makes it difficult to view and work with content on the screen. Could you please help diagnose and resolve this issue?",
      created_by_user_id: 12,
      created_at: "2024-09-06 08:30:00",
    },
    {
      ticket_id: 11,
      title: "Unable to install software update",
      description:
        "Im encountering an error when trying to install the latest software update. The installation process fails repeatedly, and Im unable to access new features or security updates. Can someone assist in resolving this installation issue?",
      created_by_user_id: 13,
      created_at: "2024-08-05 11:00:00",
    },
    {
      ticket_id: 12,
      title: "Wireless mouse not working",
      description:
        "My wireless mouse is not working at all. It doesnt seem to connect with my computer, making it impossible to navigate or use the device effectively. Can you please help me fix this issue or provide a replacement?",
      created_by_user_id: 13,
      created_at: "2024-08-05 13:00:00",
    },
    {
      ticket_id: 13,
      title: "Security alert on laptop",
      description:
        "I keep receiving a recurring security alert on my laptop. The alert appears continuously and seems to indicate a potential security threat or issue that needs attention. Can you help investigate and resolve this alert to ensure my laptop is secure?",
      created_by_user_id: 13,
      created_at: "2024-08-06 09:00:00",
    },
    {
      ticket_id: 14,
      title: "Headphones not working",
      description:
        "My headphones are not being detected by my computer. This issue is preventing me from listening to audio or participating in calls. Can someone please check this and help me get the headphones working again?",
      created_by_user_id: 13,
      created_at: "2024-08-06 10:30:00",
    },
    {
      ticket_id: 15,
      title: "Touchpad issues",
      description:
        "The touchpad on my laptop is completely unresponsive. I am unable to use it for any navigation or gestures, making it difficult to operate the laptop without an external mouse. Can you please assist with fixing or replacing the touchpad?",
      created_by_user_id: 13,
      created_at: "2024-08-06 12:00:00",
    },
    {
      ticket_id: 16,
      title: "System crash",
      description:
        "My system is experiencing frequent crashes. These crashes occur unexpectedly and cause the computer to restart, leading to potential data loss and interruptions in my work. Could you please look into this issue and help stabilize the system?",
      created_by_user_id: 14,
      created_at: "2024-08-07 08:00:00",
    },
    {
      ticket_id: 17,
      title: "Wi-Fi connection drops",
      description:
        "Im facing frequent drops in my Wi-Fi connection. The network disconnects intermittently, affecting my ability to stay online and complete tasks that rely on a stable internet connection. Can you help resolve this connectivity issue?",
      created_by_user_id: 14,
      created_at: "2024-08-07 10:00:00",
    },
    {
      ticket_id: 18,
      title: "External hard drive not detected",
      description:
        "My external hard drive is not being recognized by the computer. I cannot access the files stored on it, which is impacting my work and file management. Can someone assist with troubleshooting and fixing this detection issue?",
      created_by_user_id: 14,
      created_at: "2024-08-07 11:00:00",
    },
    {
      ticket_id: 19,
      title: "Broken laptop screen",
      description:
        "The screen on my laptop is cracked and visibly damaged. This is not only affecting my ability to view content but also may lead to further damage. Can you help with repairing or replacing the laptop screen?",
      created_by_user_id: 14,
      created_at: "2024-08-08 08:00:00",
    },
    {
      ticket_id: 20,
      title: "Bluetooth not working",
      description:
        "My Bluetooth functionality is not working, and I cannot connect any Bluetooth devices such as my wireless keyboard or headphones. This issue is hindering my ability to use wireless peripherals. Can you assist in fixing this Bluetooth problem?",
      created_by_user_id: 14,
      created_at: "2024-08-08 09:30:00",
    },
    {
      ticket_id: 21,
      title: "Unable to access email",
      description:
        "I am unable to access my email account because it appears to be locked. This is preventing me from sending and receiving important emails. Can you help unlock my account and restore access?",
      created_by_user_id: 15,
      created_at: "2024-08-08 11:00:00",
    },
    {
      ticket_id: 22,
      title: "Projector not working",
      description:
        "The office projector is not displaying any content. This issue is affecting meetings and presentations, as we cannot project slides or documents. Can you please check and repair the projector so it is operational again?",
      created_by_user_id: 15,
      created_at: "2024-08-08 13:00:00",
    },
    {
      ticket_id: 23,
      title: "Cant print from phone",
      description:
        "I am unable to print documents directly from my mobile devices. This issue is preventing me from using the mobile printing feature and is causing inconvenience. Can someone help resolve this issue?",
      created_by_user_id: 15,
      created_at: "2024-08-09 08:00:00",
    },
    {
      ticket_id: 24,
      title: "Keyboard not working",
      description:
        "The keyboard keys are unresponsive, making it impossible to type anything. This issue is critically affecting my ability to work and communicate. Could you please assist in fixing or replacing the keyboard?",
      created_by_user_id: 15,
      created_at: "2024-08-09 09:00:00",
    },
    {
      ticket_id: 25,
      title: "Slow computer performance",
      description:
        "My computer is running very slowly, affecting its performance across all applications. This slowdown is making it difficult to complete tasks efficiently. Can someone help improve the computer's performance and speed up its operation?",
      created_by_user_id: 15,
      created_at: "2024-08-09 10:30:00",
    },
    {
      ticket_id: 26,
      title: "Software crash",
      description:
        "The software I use frequently crashes or becomes unresponsive whenever I attempt to open it. This is preventing me from using the application for my tasks and is disrupting my workflow. Can you help diagnose and fix this issue?",
      created_by_user_id: 16,
      created_at: "2024-08-09 12:00:00",
    },
    {
      ticket_id: 27,
      title: "System wont shut down",
      description:
        "My system is not shutting down properly. It either hangs on the shutdown screen or restarts instead of powering off. This issue is causing prolonged power-on times and might affect system stability. Could you assist with troubleshooting and resolving this shutdown problem?",
      created_by_user_id: 16,
      created_at: "2024-08-09 13:00:00",
    },
    {
      ticket_id: 28,
      title: "Cant connect to network",
      description:
        "I am unable to connect to the corporate network. This issue is preventing me from accessing network resources, shared drives, and essential network-dependent services. Can someone help resolve this network connectivity issue?",
      created_by_user_id: 16,
      created_at: "2024-08-10 08:00:00",
    },
    {
      ticket_id: 29,
      title: "Sound issues",
      description:
        "There is no sound coming from my speakers. I am unable to hear any audio, which affects both multimedia content and communication applications. Can you help diagnose and fix this audio issue so I can hear sound from my speakers again?",
      created_by_user_id: 16,
      created_at: "2024-08-10 09:00:00",
    },
    {
      ticket_id: 30,
      title: "Battery not charging",
      description:
        "My laptop battery is not charging at all. When I plug in the charger, theres no indication that the battery is being charged. This issue is making it difficult to use the laptop without a constant power source. Can someone assist in diagnosing and fixing this battery charging problem?",
      created_by_user_id: 16,
      created_at: "2024-08-10 10:00:00",
    },
  ]);
};
