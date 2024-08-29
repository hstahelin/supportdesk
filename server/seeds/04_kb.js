exports.seed = async function (knex) {
  await knex("kb").del();
  await knex("kb").insert([
    {
      kb_id: 1,
      title: "How to reset your VPN",
      solution:
        "<h1>Step-by-step guide to reset your VPN connection.</h1><ol><li>Open VPN settings.</li><li>Select 'Reset'.</li><li>Restart your device.</li></ol>",
      is_public: true,
    },
    {
      kb_id: 2,
      title: "Troubleshooting printer issues",
      solution:
        "<h1>Common problems with printers and how to solve them.</h1><ol><li>Check if the printer is on.</li><li>Ensure it's connected to the network.</li><li>Restart the printer.</li></ol>",
      is_public: true,
    },
    {
      kb_id: 3,
      title: "Improving internet speed",
      solution:
        "<h1>Tips to speed up your internet connection.</h1><ol><li>Close unnecessary programs.</li><li>Restart your router.</li><li>Check for bandwidth-heavy applications.</li></ol>",
      is_public: true,
    },
    {
      kb_id: 4,
      title: "Installing software on company devices",
      solution:
        "<h1>Guide on installing approved software.</h1><p>Request permission through the IT portal, then download and install the software using the provided license key.</p>",
      is_public: true,
    },
    {
      kb_id: 5,
      title: "Outlook email synchronization",
      solution:
        "<h1>Fix issues with email not syncing in Outlook.</h1><ol><li>Check your internet connection.</li><li>Ensure you're using the correct credentials.</li><li>Restart Outlook.</li></ol>",
      is_public: true,
    },
    {
      kb_id: 6,
      title: "Dealing with laptop overheating",
      solution:
        "<h1>Prevent and manage laptop overheating.</h1><ol><li>Keep your laptop on a hard surface.</li><li>Clean the fans.</li><li>Use cooling pads.</li></ol>",
      is_public: true,
    },
    {
      kb_id: 7,
      title: "Accessing shared drives",
      solution:
        "<h1>How to access shared network drives.</h1><ol><li>Make sure you have the necessary permissions.</li><li>Map the drive in 'File Explorer'.</li></ol>",
      is_public: true,
    },
    {
      kb_id: 8,
      title: "System won't boot",
      solution:
        "<h1>Steps to troubleshoot a non-booting system.</h1><ol><li>Check power connections.</li><li>Ensure all cables are connected properly.</li><li>Try booting in safe mode.</li></ol>",
      is_public: true,
    },
    {
      kb_id: 9,
      title: "Resetting your password",
      solution:
        "<h1>Instructions for resetting a forgotten password.</h1><ol><li>Click 'Forgot Password' on the login screen.</li><li>Enter your registered email.</li><li>Follow the link sent to reset your password.</li></ol>",
      is_public: true,
    },
    {
      kb_id: 10,
      title: "Troubleshooting monitor flickering",
      solution:
        "<h1>Common causes of monitor flickering and how to fix them.</h1><ol><li>Check the monitor's connection.</li><li>Adjust the refresh rate in display settings.</li><li>Update your graphics driver.</li></ol>",
      is_public: true,
    },
  ]);
};
