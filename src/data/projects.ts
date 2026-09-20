export interface DemoLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  index: string; // display index like "01"
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  images: string[];
  cover: string;
  tech: string[];
  demos?: DemoLink[];
  source?: DemoLink[];
  duration: string;
  status: string;
  category: "ROBOTICS" | "EMBEDDED" | "SIM-TO-REAL" | "COMPETITION" | "LEADERSHIP";
}

export const projects: Project[] = [
  {
    id: "amr",
    index: "01",
    title: "AMR with LiDAR SLAM",
    subtitle: "Autonomous Mobile Robot · Dynamic Obstacle Avoidance",
    summary:
      "A foundational, deep-dive autonomous mobile robot platform built to master industrial ROS 2 architecture, scalability and robust autonomous navigation frameworks — from baseline chassis to NPU-accelerated AI.",
    highlights: [
      "Implemented Cartographer for LiDAR SLAM — reduced mapping noise and improved overall clarity.",
      "Integrated AMCL for real-time localization — ±5 cm pose estimation error in indoor environments.",
      "Version-1: baseline chassis with core ROS 2 navigation.",
      "Version-2: vibration-isolated design with micro-ROS control & NPU-accelerated AI.",
      "Hands-on expertise in state estimation, SLAM (online/offline), costmaps, particle filters and behaviour-tree-driven decision making via Nav2.",
      "PID motor tuning and sensor fusion (LiDAR, Encoders, IMU) using Madgwick filtering.",
    ],
    images: ["projects/img-001.jpg", "projects/img-002.jpg", "projects/img-004.jpg"],
    cover: "projects/img-001.jpg",
    tech: ["ROS 2", "Nav2", "Cartographer", "AMCL", "LiDAR", "micro-ROS", "C++", "IMU Fusion", "TurtleBot4"],
    demos: [
      { label: "Demo 1", url: "https://drive.google.com/file/d/1gYuMWMLw9vXRp5zpZledmSm4xbt9TerD/view?usp=sharing" },
      { label: "Demo 2", url: "https://drive.google.com/file/d/1DxO5cXOMWQG8-xjvnlqjdLs6dNjjrbPi/view?usp=drive_link" },
    ],
    source: [
      { label: "Source Code (Version 1)", url: "https://github.com/GradVizor/amr" },
      { label: "Source Code (Version 2)", url: "https://github.com/GradVizor/glitch-amr" },
    ],
    duration: "Apr 2024 — Present",
    status: "ACTIVE",
    category: "ROBOTICS",
  },
  {
    id: "arm",
    index: "02",
    title: "ROS2 6-DoF Robotic Arm",
    subtitle: "Multi-functional Robot Arm for Object Handling",
    summary:
      "A 6-DOF manipulator built to master the software architecture of MoveIt2 and ROS 2 Control — from open-source simulation to custom CAD hardware integration.",
    highlights: [
      "Compared IKPy and KDL inverse-kinematics solvers — IKPy achieved faster computation.",
      "Integrated MoveIt-2 for motion planning — minimum trajectory execution error.",
      "Version-1: open-source CAD, ROS 2 Control and MoveIt-2 simulation.",
      "Version-2: custom CAD, ROS 2 Control & full hardware integration.",
      "Built practical understanding of forward/inverse kinematics, DH parameters, Jacobians, velocity profiles, dexterous workspaces, and jerk minimization.",
    ],
    images: ["projects/img-008.jpg", "projects/img-005.jpg", "projects/img-006.jpg"],
    cover: "projects/img-008.jpg",
    tech: ["ROS 2", "MoveIt-2", "ROS 2 Control", "IKPy", "KDL", "Fusion 360", "C++", "Python"],
    demos: [
      { label: "Demo 1", url: "https://drive.google.com/file/d/1JQli2MtIC0zbDAjY5jQ2CWU2fHVoc-kV/view?usp=sharing" },
      { label: "Demo 2", url: "https://drive.google.com/file/d/1LEmb21K0TODazpWKeoZ2fniz44H_-rC6/view?usp=drive_link" },
      { label: "Demo 3", url: "https://drive.google.com/file/d/1X3AurunVpraGliL25VB_lllaB2Sc6P9g/view?usp=drive_link" },
    ],
    source: [
      { label: "Source Code (Version 1)", url: "https://github.com/GradVizor/eureka" },
      { label: "Source Code (Version 2)", url: "https://github.com/GradVizor/rhino_six_dof_arm" },
    ],
    duration: "Oct 2024 — Dec 2024",
    status: "COMPLETE",
    category: "ROBOTICS",
  },
  {
    id: "chronograph",
    index: "03",
    title: "Military-Grade Ballistic Chronograph",
    subtitle: "High-Speed Velocity Measurement · 1400 m/s",
    summary:
      "Engineered a high-precision ballistic chronograph for the Indian Army (MCMM, Jabalpur) to benchmark bullet velocities for chemical and shelf-life testing.",
    highlights: [
      "Optimized time-of-flight measurements and triggers to eliminate false detections in high-velocity ballistic environments.",
      "High-speed ballistic chronograph apparatus for velocity measurement up to 1400 m/s with ±2% accuracy.",
      "High-speed laser and light-sensor array gate capturing bullet shadows via analog comparators to trigger precise hardware interrupts.",
      "Evaluated multiple microcontrollers (Teensy, ESP32, Arduino) to maximize clock speed and minimize latency for microsecond-level ToF calculations.",
    ],
    images: ["projects/img-009.jpg", "projects/img-010.jpg", "projects/img-011.jpg"],
    cover: "projects/img-009.jpg",
    tech: ["C", "Teensy", "ESP32", "Arduino", "Analog Comparators", "Laser Gates", "Time-of-Flight"],
    demos: [
      { label: "Demo 1", url: "https://drive.google.com/file/d/1EwDY27H15zllCl9zA0-R3o3ooNftdYcd/view?usp=drive_link" },
      { label: "Demo 2", url: "https://drive.google.com/file/d/1JtlgsZ1PkN8DdP1d_pWpa_q685SvBess/view?usp=drive_link" },
    ],
    duration: "Jan 2025 — Apr 2025",
    status: "COMPLETE",
    category: "EMBEDDED",
  },
  {
    id: "mira",
    index: "04",
    title: "MIRA — RL Robotic Arm",
    subtitle: "MIRA: Multimodal Intelligent Robotic Arm · Sim-to-Real Transfer",
    summary:
      "Robotic arm testbed for reinforcement learning, bridging simulation-trained policies with real-world manipulation. Based on the open-source SO-ARM 100/101 platform.",
    highlights: [
      "Based on the SO-ARM 100/101 — an open-source 3D-printed arm design widely used across the robot-learning community.",
      "Platform enabling model-in-the-loop training and evaluation.",
      "Scaffolding for sim-to-real transfer of learned control policies.",
    ],
    images: ["projects/img-0122.jpg", "projects/img-0121.jpg"],
    cover: "projects/img-0122.jpg",
    tech: ["Python", "Reinforcement Learning", "MuJoCo", "PyTorch", "Gymnasium"],
    source: [{ label: "Source Code", url: "https://github.com/GradVizor/mira-arm" }],
    duration: "Ongoing",
    status: "IN PROGRESS",
    category: "SIM-TO-REAL",
  },
  {
    id: "assistive-bot",
    index: "05",
    title: "Assistive Bot for Doctors on Round",
    subtitle: "Autonomous Hospital Round Assistant",
    summary:
      "A cost-effective autonomous hospital round assistant with hands-free interaction, real-time EHR integration and a hygiene-focused diagnostic tool payload.",
    highlights: [
      "Engineered an Wifi-RSSI based triangulation system for seamless doctor-following capability.",
      "Integrated ultrasonic sensors with a master microcontroller for real-time obstacle avoidance.",
      "Hands-free interaction model designed for hygiene-critical clinical environments.",
    ],
    images: ["projects/img-015.jpg", "projects/img-013.jpg", "projects/img-014.jpg", "projects/img-016.jpg", "projects/img-017.jpg"],
    cover: "projects/img-015.jpg",
    tech: ["ESP32", "RSSI Triangulation", "Ultrasonic", "Embedded C", "EHR Integration", "Speech-to-Text"],
    demos: [{ label: "Demo", url: "https://drive.google.com/file/d/1kRaoBHwdX3ATXH3AQuDs8nywXvZMuONG/view?usp=drive_link" }],
    duration: "Oct 2024 — Apr 2025",
    status: "COMPLETE",
    category: "ROBOTICS",
  },
  {
    id: "bare-metal",
    index: "06",
    title: "Bare-Metal STM32F446RE Drivers",
    subtitle: "Embedded Driver Architecture · DMA Accelerated",
    summary:
      "A modular, register-level driver architecture for the STM32F446RE — built from scratch with no HAL, engineered for maintainability and performance.",
    highlights: [
      "Developed a modular driver architecture — improved maintainability and reduced future development time by ~30%.",
      "Implemented DMA for I2C, SPI and UART — reducing CPU load and increasing throughput by ~40%.",
      "Register-level bare-metal implementation: UART, I2C, SPI, GPIO, EXTI, timers and DMA engine.",
    ],
    images: [],
    cover: "projects/STM32F446RE.jpg",
    tech: ["C", "STM32F446RE", "DMA", "I2C / SPI / UART", "Bare-Metal", "CMake"],
    duration: "Jun 2024 — Aug 2024",
    status: "COMPLETE",
    category: "EMBEDDED",
    source: [{ label: "Source Code", url: "https://github.com/GradVizor/stm32f446re_drivers" }],
  },
  {
    id: "robocon",
    index: "07",
    title: "DD Robocon — Team Leader",
    subtitle: "National Robotics Championship · DD Robocon India",
    summary:
      "Led a 30-member engineering team for DD Robocon — the official Indian national selection stage for ABU Robocon, Asia's premier collegiate robotics championship.",
    highlights: [
      "Directed the design stage to secure a Stage-1 score of 86/100 — top rank nationally.",
      "Prioritized mechanical robustness, manufacturing feasibility and practical component selection.",
      "Managed critical resource allocation, engineering logistics and alternative project strategies under severe funding constraints.",
    ],
    images: ["projects/img-018.jpg", "projects/img-019.jpg"],
    cover: "projects/img-018.jpg",
    tech: ["Team Leadership", "Mechanical Design", "Control Systems", "Robotics"],
    demos: [{ label: "Overall Architecture", url: "https://drive.google.com/file/d/1pwANiIDy8I8rsiHQaEQ__5zfnFvcrz1S/view?usp=drive_link" }],
    duration: "Jan 2025",
    status: "COMPLETE",
    category: "COMPETITION",
  },
];

export interface ExperienceItem {
  id: string;
  title: string;
  org: string;
  location: string;
  duration: string;
  type: string;
  summary: string;
  items: string[];
  demos?: DemoLink[];
  images?: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "zenithra-fte",
    title: "Robotics Engineer",
    org: "ZenithraTech (MapmyIndia)",
    location: "New Delhi",
    duration: "Jul 2026 — Present",
    type: "INDUSTRY",
    summary:
      "Converted from internship to full-time — owning end-to-end development and deployment of defense-grade UAV features across software and hardware stacks.",
    items: [
      "Evaluating software-defined radios (SDRs) for integrating our custom UAV stack — targeting agile, long-range, error-resilient wireless links.",
      "Delivered a dual-feed video system streaming live footage from two drones to a single ground unit.",
      "Contributed flight controller support to ArduPilot — our FC now listed among its supported boards.",
    ],
  },
  {
    id: "zenithra",
    title: "Robotics Intern",
    org: "ZenithraTech (MapmyIndia)",
    location: "New Delhi",
    duration: "May 2025 — Jun 2026",
    type: "INDUSTRY",
    summary:
      "Transitioned from foundational aerial robotics to deploying advanced autonomy for defense applications — owning hardware integration, data-flow optimization and embedded AI across UAV software/hardware stacks.",
    items: [
      "Designed a proprietary, low-latency UAV video streaming stack utilizing WFB-ng protocols, optimized for high-reliability 2.4/5.8 GHz operation.",
      "Achieved 2.8 km digital video and 3.2 km telemetry range by optimizing RF configurations and hardware interference-proofing.",
      "Benchmarked edge SoCs with hardware accelerators (NavQPlus i.MX8M Plus, Luckfox, RDK, Milk-V) for embedded AI deployment.",
      "Engineered region-of-interest (ROI) tracking systems for real-time person and vehicle monitoring.",
    ],
  },
  {
    id: "ers",
    title: "Co-Coordinator & Coordinator",
    org: "Electronics and Robotics Society · IIIT Jabalpur",
    location: "Jabalpur",
    duration: "Jan 2024 — May 2025",
    type: "LEADERSHIP",
    summary:
      "Led a premier college society for nearly two years, cultivating an industrial-grade robotics ecosystem and mentoring over 250 engineering enthusiasts.",
    items: [
      "Organized 20+ hands-on robotics workshops covering ROS, hardware and electronics.",
      "Conceptualized and executed cross-college technical workshops, hands-on sessions, symposiums and competitive hackathons.",
      "Shifted the organization's paradigm from hobbyist projects toward advanced, industry-relevant robotics frameworks.",
    ],
    demos: [
      { label: "Video 1", url: "https://drive.google.com/file/d/1myuPPzz4kFUllL2e4ui5Gc5Hs1ouaXtV/view?usp=drive_link" },
      { label: "Website", url: "https://robotics.iiitdmj.ac.in/" },
    ],
    images: [
      "projects/img-020.jpg",
      "projects/img-021.jpg",
      "projects/img-022.jpg",
      "projects/img-023.jpg",
      "projects/img-024.jpg",
    ],
  },
];

export const achievements = [
  {
    title: "BotBrains — IIT Bhubaneswar",
    detail: "Ranked 6th among 570+ participants in a three-round national-level robotics & AI competition.",
    meta: "RANK 6 / 570+",
    date: "Jun 2024",
  },
  {
    title: "DD Robocon — IIT Delhi",
    detail: "Led the team to score 86/100 in Stage-1 — a top national rank in the ABU Robocon selection stage.",
    meta: "SCORE 86/100",
    date: "Jan 2025",
  },
];

export const aboutFacts = [
  {
    k: "DEGREE",
    v: "B.Tech · ECE",
    d: "IIITDM Jabalpur, graduated May 2026",
  },
  {
    k: "FOCUS",
    v: "Autonomy",
    d: "SLAM, perception, ROS 2, embedded AI at the edge",
  },
  {
    k: "ROLE",
    v: "Robotics Engineer",
    d: "Full-time at ZenithraTech (MapmyIndia), New Delhi",
  },
  {
    k: "COMMUNITY",
    v: "ERS · IIIT Jabalpur",
    d: "Electronics and Robotics Society — 250+ mentees",
  },
];