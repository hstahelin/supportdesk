exports.seed = async function (knex) {
  await knex("KB").del();
  await knex("KB").insert([
    {
      kb_id: 1,
      title: "How to reset your VPN",
      solution: `<h1>Step-by-step guide to reset your VPN connection.</h1>
           <p>If you are experiencing issues with your VPN connection, follow these steps to reset it:</p>
           <ol>
             <li>Open your device's VPN settings. You can usually find this in the 'Network & Internet' section of your system settings.</li>
             <li>Locate the option to 'Reset' or 'Forget' the current VPN connection. This will remove any existing settings and credentials.</li>
             <li>After resetting, restart your device to apply the changes.</li>
             <li>Reconfigure your VPN by entering the server details and credentials provided by your IT department.</li>
           </ol>
           <p>If the issue persists, contact IT support for further assistance.</p>`,
      is_public: true,
    },
    {
      kb_id: 2,
      title: "Troubleshooting printer issues",
      solution: `<h1>Common problems with printers and how to solve them.</h1>
           <p>Printer issues can often be solved by performing a few basic checks:</p>
           <ol>
             <li>Ensure the printer is powered on and that all cables are securely connected.</li>
             <li>Check if the printer is properly connected to the same network as your computer or mobile device.</li>
             <li>Restart the printer to reset its connection to the network.</li>
             <li>If the issue persists, verify that the correct printer is selected in the print dialog on your device.</li>
             <li>Check the printer's queue for any stuck jobs and clear them.</li>
           </ol>
           <p>If these steps do not resolve the issue, consult the printer manual or contact support.</p>`,
      is_public: true,
    },
    {
      kb_id: 3,
      title: "Improving internet speed",
      solution: `<h1>Tips to speed up your internet connection.</h1>
           <p>Slow internet speeds can impact productivity. Here are some tips to optimize your connection:</p>
           <ol>
             <li>Close any unnecessary programs or browser tabs that may be consuming bandwidth.</li>
             <li>Restart your router and modem to refresh the connection. Unplug them for 30 seconds before reconnecting.</li>
             <li>Check for applications running in the background, such as file downloads or updates, which can slow down your connection.</li>
             <li>Consider upgrading your internet plan if multiple devices are connected to the network simultaneously.</li>
           </ol>
           <p>For persistent issues, contact your internet service provider for further assistance.</p>`,
      is_public: true,
    },
    {
      kb_id: 4,
      title: "Installing software on company devices",
      solution: `<h1>Guide on installing approved software.</h1>
           <p>To ensure compliance with company policy, follow these steps when installing software on company devices:</p>
           <ol>
             <li>First, request installation permission through the IT portal by submitting a request with details of the software you wish to install.</li>
             <li>Once approved, download the software from the company’s approved software repository or directly from the vendor's site if allowed.</li>
             <li>Use the provided license key during installation if necessary. Ensure you read and agree to any terms of use.</li>
           </ol>
           <p>If you encounter any issues during installation, contact the IT department for further guidance.</p>`,
      is_public: true,
    },
    {
      kb_id: 5,
      title: "Outlook email synchronization",
      solution: `<h1>Fix issues with email not syncing in Outlook.</h1>
           <p>If you're having trouble with Outlook email synchronization, follow these steps:</p>
           <ol>
             <li>Verify that your internet connection is stable by checking other online services or applications.</li>
             <li>Ensure you are using the correct credentials by logging out of Outlook and logging back in with your username and password.</li>
             <li>Restart Outlook. This can refresh the sync process and resolve temporary glitches.</li>
             <li>Check for any updates for Outlook or your email provider’s settings, which may need to be adjusted.</li>
           </ol>
           <p>If your emails still aren’t syncing, you may need to re-add your email account in Outlook or contact IT support.</p>`,
      is_public: true,
    },
    {
      kb_id: 6,
      title: "Dealing with laptop overheating",
      solution: `<h1>Prevent and manage laptop overheating.</h1>
           <p>Overheating can reduce the performance and lifespan of your laptop. Here are some ways to manage it:</p>
           <ol>
             <li>Place your laptop on a hard, flat surface to allow proper ventilation. Avoid using it on soft surfaces like beds or couches.</li>
             <li>Clean the laptop’s air vents and fans regularly to prevent dust buildup, which can block airflow.</li>
             <li>Consider using a cooling pad to provide additional airflow and reduce the laptop’s temperature.</li>
             <li>Ensure you are using your laptop in a cool, well-ventilated area.</li>
           </ol>
           <p>If your laptop continues to overheat, consult the manufacturer or IT support for further assistance.</p>`,
      is_public: false,
    },
    {
      kb_id: 7,
      title: "Accessing shared drives",
      solution: `<h1>How to access shared network drives.</h1>
           <p>Shared drives provide a central location for files within your organization. To access them:</p>
           <ol>
             <li>Ensure you have been granted the necessary permissions by your IT department.</li>
             <li>In Windows, open 'File Explorer', right-click on 'This PC', and select 'Map Network Drive'.</li>
             <li>Enter the network path of the shared drive, which will usually start with '\\\\' followed by the server name and folder path.</li>
             <li>Check 'Reconnect at sign-in' if you want the drive to be automatically reconnected when you log in.</li>
           </ol>
           <p>If you encounter any permission issues, contact your IT department to verify your access rights.</p>`,
      is_public: true,
    },
    {
      kb_id: 8,
      title: "System won't boot",
      solution: `<h1>Steps to troubleshoot a non-booting system.</h1>
           <p>If your system won’t boot, follow these steps to troubleshoot:</p>
           <ol>
             <li>Check all power connections, including the power supply to your system and the outlet it’s connected to.</li>
             <li>Ensure all internal and external cables are securely connected, including those to your monitor, keyboard, and other peripherals.</li>
             <li>Attempt to boot the system in safe mode by pressing the appropriate key (usually F8) during startup. This can help identify software-related issues.</li>
             <li>If the issue persists, consider resetting the BIOS or contacting IT support for further assistance.</li>
           </ol>`,
      is_public: true,
    },
    {
      kb_id: 9,
      title: "Resetting your password",
      solution: `<h1>Instructions for resetting a forgotten password.</h1>
           <p>If you’ve forgotten your password, follow these steps to reset it:</p>
           <ol>
             <li>On the login screen, click the 'Forgot Password' link.</li>
             <li>Enter your registered email address in the prompt.</li>
             <li>Check your email for a password reset link and follow the instructions to create a new password.</li>
             <li>Ensure your new password meets the security criteria (e.g., length and complexity).</li>
           </ol>
           <p>If you do not receive the reset email, check your spam folder or contact support for further help.</p>`,
      is_public: true,
    },
    {
      kb_id: 10,
      title: "Troubleshooting monitor flickering",
      solution: `<h1>Common causes of monitor flickering and how to fix them.</h1>
           <p>Monitor flickering can be caused by a number of issues. Try these steps:</p>
           <ol>
             <li>Ensure the monitor’s cables are securely connected to both the monitor and your computer.</li>
             <li>Adjust the refresh rate of your display by navigating to 'Display Settings' and selecting the appropriate refresh rate for your monitor.</li>
             <li>Update your graphics card drivers. You can do this through the device manager or by downloading the latest drivers from the manufacturer’s website.</li>
             <li>Test the monitor on another device to determine if the issue is with the monitor or the computer.</li>
           </ol>
           <p>If the problem persists, consult the monitor’s manual or contact support for further assistance.</p>`,
      is_public: false,
    },
  ]);
};
