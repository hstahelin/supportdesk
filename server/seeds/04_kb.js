exports.seed = async function (knex) {
  await knex("kb").del();
  await knex("kb").insert([
    {
      id: 1,
      title: "How to reset your VPN",
      description: "Step-by-step guide to reset your VPN connection.",
      solution:
        "Follow these steps: 1. Open VPN settings. 2. Select 'Reset'. 3. Restart your device.",
      is_public: true,
    },
    {
      id: 2,
      title: "Troubleshooting printer issues",
      description: "Common problems with printers and how to solve them.",
      solution:
        "1. Check if the printer is on. 2. Ensure it's connected to the network. 3. Restart the printer.",
      is_public: true,
    },
    {
      id: 3,
      title: "Improving internet speed",
      description: "Tips to speed up your internet connection.",
      solution:
        "1. Close unnecessary programs. 2. Restart your router. 3. Check for bandwidth-heavy applications.",
      is_public: true,
    },
    {
      id: 4,
      title: "Installing software on company devices",
      description: "Guide on installing approved software.",
      solution:
        "Request permission through the IT portal, then download and install the software using the provided license key.",
      is_public: true,
    },
    {
      id: 5,
      title: "Outlook email synchronization",
      description: "Fix issues with email not syncing in Outlook.",
      solution:
        "1. Check your internet connection. 2. Ensure you're using the correct credentials. 3. Restart Outlook.",
      is_public: true,
    },
    {
      id: 6,
      title: "Dealing with laptop overheating",
      description: "Prevent and manage laptop overheating.",
      solution:
        "1. Keep your laptop on a hard surface. 2. Clean the fans. 3. Use cooling pads.",
      is_public: true,
    },
    {
      id: 7,
      title: "Accessing shared drives",
      description: "How to access shared network drives.",
      solution:
        "1. Make sure you have the necessary permissions. 2. Map the drive in 'File Explorer'.",
      is_public: true,
    },
    {
      id: 8,
      title: "System won't boot",
      description: "Steps to troubleshoot a non-booting system.",
      solution:
        "1. Check power connections. 2. Ensure all cables are connected properly. 3. Try booting in safe mode.",
      is_public: true,
    },
    {
      id: 9,
      title: "Resetting your password",
      description: "Instructions for resetting a forgotten password.",
      solution:
        "1. Click 'Forgot Password' on the login screen. 2. Enter your registered email. 3. Follow the link sent to reset your password.",
      is_public: true,
    },
    {
      id: 10,
      title: "Troubleshooting monitor flickering",
      description: "Common causes of monitor flickering and how to fix them.",
      solution:
        "1. Check the monitor's connection. 2. Adjust the refresh rate in display settings. 3. Update your graphics driver.",
      is_public: true,
    },
  ]);
};
