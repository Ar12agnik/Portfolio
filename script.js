document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const commandInput = document.getElementById('command-input');
    const outputContainer = document.getElementById('output-container');
    const cursor = document.getElementById('cursor');
    const terminalContent = document.getElementById('terminal-content');
    const bootSequence = document.getElementById('boot-sequence');
    const asciiArt = document.getElementById('ascii-art');
    const mobileCommands = document.querySelectorAll('.mobile-command');
    const projectsModal = document.getElementById('projects-modal');
    const closeModal = document.querySelector('.close-modal');
    const projectGrid = document.getElementById('project-grid');
    const cvDownloadLink = document.getElementById('cv-download-link');
    const slContainer = document.getElementById('sl-container');
    const slTrain = document.getElementById('sl-train');
    
    // Command history
    let commandHistory = [];
    let historyIndex = -1;
    
    // Project data from CV
    const projectsData = [
        {
            title: "Silk Road – E-Commerce Platform",
            type: "College Final Year Project",
            description: "Built a Django-based e-commerce site with MySQL and Bootstrap. Added Razorpay payment integration for secure checkout. Implemented product browsing, cart, authentication, orders, and reviews. Created an admin panel for inventory, orders, and user management.",
            technologies: ["Django", "Python", "MySQL", "Bootstrap", "HTML/CSS", "JavaScript", "Razorpay API"],
            achievement: null,
            date: "2024-2025"
        },
        {
            title: "Smart Card – Document & Credential Management Solution",
            type: "EYUVA Semi-finals Project",
            description: "Designed a secure, scalable smart card system for storing and accessing essential documents. Enabled quick retrieval of credentials in emergencies through a compact digital format. Developed all backend logic for secure document storage and retrieval.",
            technologies: ["Django", "Bootstrap", "SQLite", "Python"],
            achievement: "EYUVA Finalist (2024): Recognized for innovation in document storage",
            date: "2024"
        },
        {
            title: "PassVolt – Password Manager",
            type: "Personal Security Project",
            description: "Developed a password manager using Django with features to generate, store, and retrieve passwords securely. Implemented secure password storage using hashed credentials and retrieval logic.",
            technologies: ["Django", "Python", "SQLite", "JavaScript", "jQuery"],
            achievement: null,
            date: "2023"
        }
    ];
    
    // Education data
    const educationData = [
        {
            period: "2022-2025",
            institution: "Brainware University",
            degree: "Bachelor of Computer Applications",
            details: "Currently pursuing BCA with focus on software development and computer applications"
        },
        {
            period: "2022",
            institution: "Aditya Academy, Barasat",
            degree: "12th (Senior Secondary Examination)",
            details: "Central Board of Secondary Education"
        },
        {
            period: "2020",
            institution: "South Point High School",
            degree: "10th (Secondary Examination)",
            details: "Central Board of Secondary Education"
        }
    ];
    
    // SL Train ASCII Art (oriented for right-to-left movement)
const slTrainASCII = [
    "                               (@@) (  ) (@)  ( )  @@    ()    @     O     @     O      @",
    "                          (   )",
    "                      (@@@@)",
    "                   (    )",
    "                 (@@@)",
    "               ====        ________                ___________",
    "           _D _|  |_______/        \\__I_I_____===__|_________|",
    "            |(_)---  |   H\\________/ |   |        =|___ ___|      _________________",
    "            /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A",
    "           |      |  |   H  |__--------------------| [___] |   =|                        |",
    "           | ________|___H__/__|_____/[][]~\\_______|       |   -|                        |",
    "           |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_",
    "         __/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_",
    "          |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|",
    "           \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/"
];
    
    // Available commands (updated with new commands)
    const commands = {
        'whoami': {
            description: 'Display information about Agnik',
            execute: function() {
                return `I am Agnik Roy, a Python developer based in Kolkata, India. I specialize in building robust backend systems using Django and creating efficient command-line applications. Currently pursuing BCA at Brainware University and exploring .NET/C#.\n\nContact: 9547418983\nAddress: Kudghat, Kolkata, West Bengal`;
            }
        },
        'cat skills.txt': {
            description: 'Display technical skills and stack',
            execute: function() {
                return `Languages: Python, Java, SQL, C# (Learning)\nFrameworks: Django, FastAPI, .NET (Exploring)\nWeb Technologies: JavaScript, jQuery, RESTful API, Bootstrap\nData Science & Libraries: Pandas, NumPy\nTools: Git, GitHub, PyCharm, Linux (Debian)\nCore: Data Structures, Algorithms, Logic Building`;
            }
        },
        'history': {
            description: 'Display work experience',
            execute: function() {
                return `Jan 2025 - Apr 2025: Web Development Intern at Inner Eye Consultancy Services LLP, Kolkata\n- Integrated APIs and handled real-time data rendering using JavaScript and jQuery\n- Implemented backend logic using .NET and optimized SQL Server stored procedures\n- Built reusable frontend components and ensured cross-browser compatibility\n- Developed REST API endpoints using FastAPI for internal workflows\n\nAchievements:\n- EYUVA Finalist (2024): Recognized for Smart Card project\n- Selected in Smart India Hackathon at College Level`;
            }
        },
        'projects': {
            description: 'Show projects portfolio',
            execute: function() {
                openProjectsModal();
                return "Opening projects portfolio in visual mode...";
            }
        },
        'education': {
            description: 'Display education background',
            execute: function() {
                let educationText = "Education Background:\n\n";
                educationData.forEach(edu => {
                    educationText += `${edu.period} - ${edu.institution}\n`;
                    educationText += `  ${edu.degree}\n`;
                    educationText += `  ${edu.details}\n\n`;
                });
                return educationText;
            }
        },
        'download cv': {
            description: 'Download my CV/Resume',
            execute: function() {
                setTimeout(() => {
                    cvDownloadLink.click();
                }, 500);
                return `Opening CV download link...\n\n📄 Downloading: "Agnik Roy - Updated CV.pdf"\n📁 Google Drive folder opening in new tab\n\nTip: You can also access it directly at:\nhttps://drive.google.com/drive/folders/1bvFG3GNSQpBXex9pHFkhny8nLLxPBObf`;
            }
        },
        'contact': {
            description: 'Display contact information',
            execute: function() {
                return `Email: ar12agnik@gmail.com\nLinkedIn: linkedin.com/in/ar12agnik\nGitHub: github.com/Ar12agnik\nContact: 9547418983\nAddress: Kudghat, Kolkata, West Bengal`;
            }
        },
        'help': {
            description: 'Display available commands',
            execute: function() {
                let helpText = `Available commands:\n\n`;
                for (const cmd in commands) {
                    helpText += `  ${cmd.padEnd(20)} - ${commands[cmd].description}\n`;
                }
                helpText += `\n  clear                - Clear terminal screen\n  sudo                 - Easter egg command\n  sl                   - Steam locomotive (Linux Easter egg)`;
                return helpText;
            }
        },
        'sudo': {
            description: 'Easter egg command',
            execute: function() {
                return `Permission denied: You are not Agnik.`;
            }
        },
        'sl': {
            description: 'Steam locomotive (Linux Easter egg)',
            execute: function() {
                showSLTrain();
                return "🚂 All aboard! The classic Linux 'sl' train is passing through from right to left...\n(Click anywhere to skip)";
            }
        },
        'clear': {
            description: 'Clear terminal screen',
            execute: function() {
                outputContainer.innerHTML = '';
                return null;
            }
        }
    };
    
    // Initialize boot sequence
    function initBootSequence() {
        // After boot sequence completes, show ASCII art
        setTimeout(() => {
            asciiArt.style.display = 'block';
            // Type out the first welcome line after boot
            typeOutput('Type "help" to see available commands.', 'system');
        }, 5000);
    }
    
    // Show SL Train Animation
    function showSLTrain() {
    // Clear previous train
    slTrain.innerHTML = '';
    slContainer.style.display = 'block';
    
    // Create train lines
    slTrainASCII.forEach((line, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.textContent = line;
        lineDiv.style.position = 'relative';
        slTrain.appendChild(lineDiv);
        
        // Add smoke effects to engine parts
        if (index < 8) {
            // Create smoke particles (moving to the right)
            for (let s = 0; s < 4; s++) {
                setTimeout(() => {
                    for (let i = 0; i < 3; i++) {
                        const smoke = document.createElement('span');
                        smoke.className = 'sl-smoke';
                        smoke.textContent = '~';
                        // Position smoke to the right of the engine
                        smoke.style.left = `${Math.random() * 100 + 200}px`;
                        smoke.style.top = `${Math.random() * 10 - 5}px`;
                        smoke.style.animationDelay = `${s * 0.5 + i * 0.1}s`;
                        smoke.style.fontSize = `${Math.random() * 10 + 15}px`;
                        lineDiv.appendChild(smoke);
                    }
                }, s * 800);
            }
        }
        
        // Add whistle to the engine
        if (index === 3) {
            setTimeout(() => {
                const whistle = document.createElement('span');
                whistle.className = 'whistle';
                whistle.textContent = 'TOOT TOOT!';
                whistle.style.left = '220px';
                whistle.style.top = '-10px';
                lineDiv.appendChild(whistle);
                
                // Remove whistle after animation
                setTimeout(() => {
                    if (whistle.parentNode) {
                        whistle.remove();
                    }
                }, 2000);
            }, 1000);
        }
    });
    
    // Add click message
    const clickMsg = document.createElement('div');
    clickMsg.className = 'click-message';
    clickMsg.textContent = 'Click anywhere to skip animation';
    slContainer.appendChild(clickMsg);
    
    // Auto-remove click message after 3 seconds
    setTimeout(() => {
        if (clickMsg.parentNode) {
            clickMsg.style.opacity = '0';
            clickMsg.style.transition = 'opacity 1s';
            setTimeout(() => {
                if (clickMsg.parentNode) {
                    clickMsg.remove();
                }
            }, 1000);
        }
    }, 3000);
    
    // Hide train after animation completes (15 seconds)
    setTimeout(() => {
        closeSLTrain();
    }, 15000);
}
    
    // Close SL train
    function closeSLTrain() {
        slContainer.style.display = 'none';
        slTrain.innerHTML = '';
        // Remove all child elements except the train
        while (slContainer.firstChild && slContainer.firstChild !== slTrain) {
            slContainer.removeChild(slContainer.firstChild);
        }
        commandInput.focus();
    }
    
    // Open projects modal
    function openProjectsModal() {
        loadProjects();
        projectsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close projects modal
    function closeProjectsModal() {
        projectsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        commandInput.focus();
    }
    
    // Load projects into modal
    function loadProjects() {
        projectGrid.innerHTML = '';
        
        projectsData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            let techTags = '';
            project.technologies.forEach(tech => {
                techTags += `<span class="tech-tag">${tech}</span>`;
            });
            
            let achievementHTML = '';
            if (project.achievement) {
                achievementHTML = `<div class="project-achievement">🏆 ${project.achievement}</div>`;
            }
            
            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <div class="project-date">${project.type} | ${project.date}</div>
                <div class="project-description">${project.description}</div>
                <div class="project-tech">${techTags}</div>
                ${achievementHTML}
            `;
            
            projectGrid.appendChild(projectCard);
        });
    }
    
    // Execute a command
    function executeCommand(cmd) {
        // Add command to history
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;
        
        // Display command line
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.textContent = `visitor@agnik-portfolio:~$ ${cmd}`;
        outputContainer.appendChild(commandLine);
        
        // Process command
        let output = '';
        let cmdKey = cmd.trim().toLowerCase();
        
        // Handle command variations
        if (cmdKey === 'skills') {
            cmdKey = 'cat skills.txt';
        } else if (cmdKey === 'cv' || cmdKey === 'resume') {
            cmdKey = 'download cv';
        }
        
        if (commands[cmdKey]) {
            output = commands[cmdKey].execute();
            
            // If command returns null (like clear), don't show output
            if (output !== null) {
                typeOutput(output, 'command');
            }
        } else {
            typeOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
        
        // Clear input
        commandInput.value = '';
        
        // Scroll to bottom
        setTimeout(() => {
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }, 100);
    }
    
    // Type output with animation
    function typeOutput(text, type = 'command') {
        const lines = text.split('\n');
        
        lines.forEach((line, index) => {
            const outputLine = document.createElement('div');
            outputLine.className = `output-line ${type === 'error' ? 'comment' : ''}`;
            outputContainer.appendChild(outputLine);
            
            // Type out each character
            let i = 0;
            const typeChar = () => {
                if (i < line.length) {
                    outputLine.textContent += line.charAt(i);
                    i++;
                    setTimeout(typeChar, type === 'error' ? 10 : 5);
                }
            };
            
            // Start typing after a short delay for each line
            setTimeout(typeChar, index * 50);
        });
    }
    
    // Handle command input
    commandInput.addEventListener('keydown', function(e) {
        // Handle Enter key
        if (e.key === 'Enter') {
            const cmd = commandInput.value.trim();
            if (cmd) {
                executeCommand(cmd);
            }
            e.preventDefault();
            return;
        }
        
        // Handle Tab key for autocomplete
        if (e.key === 'Tab') {
            e.preventDefault();
            const input = commandInput.value.trim().toLowerCase();
            const matchingCommands = Object.keys(commands).filter(c => c.startsWith(input));
            
            if (matchingCommands.length === 1) {
                commandInput.value = matchingCommands[0];
            } else if (matchingCommands.length > 1) {
                typeOutput(`Did you mean: ${matchingCommands.join(', ')}`, 'system');
            }
            return;
        }
        
        // Handle Arrow Up/Down for command history
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            }
        }
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                commandInput.value = '';
            }
        }
    });
    
    // Handle mobile command buttons
    mobileCommands.forEach(button => {
        button.addEventListener('click', function() {
            const cmd = this.getAttribute('data-command');
            executeCommand(cmd);
        });
    });
    
    // Modal close events
    closeModal.addEventListener('click', closeProjectsModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === projectsModal) {
            closeProjectsModal();
        }
        if (e.target === slContainer) {
            closeSLTrain();
        }
    });
    
    // Auto-focus input on click anywhere
    document.addEventListener('click', function() {
        if (projectsModal.style.display !== 'block' && slContainer.style.display !== 'block') {
            commandInput.focus();
        }
    });
    
    // Initialize
    initBootSequence();
    loadProjects(); // Preload projects data
    
    // Set initial focus
    setTimeout(() => {
        commandInput.focus();
    }, 6000);
    
    // Add some initial instructions after boot
    setTimeout(() => {
        const instruction = document.createElement('div');
        instruction.className = 'output-line comment';
        instruction.textContent = 'Welcome to Agnik Roy\'s interactive portfolio. Type "help" to get started.';
        instruction.style.opacity = '1';
        outputContainer.appendChild(instruction);
    }, 5500);
    
    // Easter egg: Sometimes show hint about sl
    setTimeout(() => {
        if (Math.random() > 0.7) {
            const hint = document.createElement('div');
            hint.className = 'output-line comment';
            hint.textContent = '💡 Try typing "sl" for the classic Linux train easter egg!';
            hint.style.opacity = '1';
            hint.style.animation = 'fadeIn 2s';
            outputContainer.appendChild(hint);
            setTimeout(() => {
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }, 100);
        }
    }, 15000);
});