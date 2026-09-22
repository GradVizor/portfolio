export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    category: "LANGUAGES",
    skills: ["C", "C++", "Embedded C", "Python", "Bash", "CMake"],
  },
  {
    id: "autonomy",
    category: "ROS & AUTONOMY",
    skills: ["ROS 2", "Nav2", "MoveIt-2", "Cartographer", "AMCL", "micro-ROS"],
  },
  {
    id: "perception",
    category: "PERCEPTION & AI",
    skills: ["LiDAR", "Sensor Fusion", "OpenCV", "PyTorch", "Reinforcement Learning", "Edge NPU"],
  },
  {
    id: "embedded",
    category: "EMBEDDED",
    skills: ["STM32", "ESP32", "Teensy", "Arduino", "Bare-Metal", "DMA", "I2C / SPI / UART"],
  },
  {
    id: "aerial",
    category: "AERIAL SYSTEMS",
    skills: ["PX4", "MAVLink", "ArduPilot", "WFB-ng", "SDR"],
  },
  {
    id: "sim2real",
    category: "SIM-TO-REAL",
    skills: ["MuJoCo", "Gazebo", "Gymnasium", "Rviz2"],
  },
  {
    id: "agentic",
    category: "AI AGENTS & TOOLING",
    skills: ["LLM Agents", "Tool Calling", "MCP", "Prompt Engineering"],
  },
  {
    id: "leadership",
    category: "LEADERSHIP & TOOLS",
    skills: ["Git", "Linux", "Docker"],
  },
];