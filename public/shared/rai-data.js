window.RAI = {
  features: [
    ['hero', 'Hero'],
    ['paths', 'Career and college paths'],
    ['quiz', 'Engineer quiz'],
    ['maze', 'Robot maze'],
    ['sensors', 'Build a robot'],
    ['logic', 'Pattern challenge'],
    ['trainer', 'Train a classifier'],
    ['vision', 'Vision Lab'],
    ['leaderboard', 'Leaderboard']
  ],

  careers: [
    ['Robotics engineer', 'Robotics', 'Designs robots that sense, plan and act, from warehouse arms to planetary rovers.', 'Kinematics, ROS, CAD, Python and C++', 'B.Tech in Mechanical, ECE or CSE, then a robotics MS'],
    ['Mechatronics engineer', 'Robotics', 'Joins mechanics, electronics and code so one machine works as a whole.', 'Circuits, sensors, PLCs, 3D design', 'B.Tech in Mechatronics, Mechanical or EEE'],
    ['Control and automation engineer', 'Robotics', 'Makes motors and processes hit their target smoothly and safely.', 'Control theory, PID, MATLAB, signals', 'B.Tech in EEE, ECE or Instrumentation, then GATE'],
    ['Drone and autonomous vehicle engineer', 'Robotics', 'Builds machines that navigate roads and skies without a driver.', 'Sensor fusion, SLAM, path planning', 'B.Tech in Aerospace, ECE or CSE, plus a research project'],
    ['Medical robotics engineer', 'Robotics', 'Creates surgical arms, exoskeletons and prosthetics that work with a body.', 'Biomechanics, haptics, safety design', 'B.Tech in Biomedical or Mechanical, then an MS'],
    ['Computer vision engineer', 'AI', 'Teaches cameras to detect, track and understand what they see.', 'Python, OpenCV, deep learning, linear algebra', 'B.Tech in CSE or ECE with an AI specialisation'],
    ['Machine learning engineer', 'AI', 'Trains models on data and ships them so real products use them.', 'Statistics, PyTorch, data pipelines, MLOps', 'B.Tech in CSE or an AI degree'],
    ['Language model engineer', 'AI', 'Builds systems that read, write and reason with text.', 'Transformers, evaluation, retrieval, Python', 'B.Tech in CSE, then research or applied work'],
    ['Reinforcement learning researcher', 'Research', 'Trains agents that learn by trial and error, in games and on robots.', 'Probability, optimisation, simulation', 'B.Tech or BS, then an MS or PhD'],
    ['AI safety and ethics researcher', 'Research', 'Studies how models fail, who they treat unfairly and how to prevent harm.', 'ML basics, statistics, policy, writing', 'CS or maths degree with a research or policy track'],
    ['Embedded and TinyML engineer', 'Hardware', 'Squeezes models and firmware onto chips that run for months on a battery.', 'C, microcontrollers, quantisation, RTOS', 'B.Tech in ECE or EEE'],
    ['Chip and accelerator designer', 'Hardware', 'Designs the GPUs, TPUs and NPUs that make AI fast.', 'Digital design, Verilog, computer architecture', 'B.Tech in ECE or CSE, then an MS in VLSI']
  ],

  paths: {
    india: [
      ['IITs', 'JEE Main, JEE Advanced, JoSAA', 'AI degrees at IIT Hyderabad, Madras, Guwahati, Roorkee, Kharagpur, Jodhpur and Ropar. Robotics comes through CSE, EE, ME and Engineering Physics.', 'https://josaa.nic.in'],
      ['NITs and IIITs', 'JEE Main, JoSAA', 'AI and data science branches at NIT Warangal, Delhi and Kurukshetra, plus IIIT Delhi and others.', 'https://jeemain.nta.nic.in'],
      ['IIIT Hyderabad', 'JEE Main or UGEE', 'A research-heavy CSE programme with strong robotics and vision labs.', 'https://www.iiit.ac.in'],
      ['BITS Pilani, Goa and Hyderabad', 'BITSAT', 'CSE, ECE and Mechanical with robotics electives, plus a practice school year.', 'https://www.bitsadmission.com'],
      ['Private universities', 'Own entrance exam plus board marks', 'VIT, SRM, Manipal, Amrita and Shiv Nadar offer AI and robotics branches. Compare labs and placements first.', null],
      ['State exams', 'MHT-CET and other state CETs', 'Government engineering colleges in your state, often at low fees.', null],
      ['Online degree', 'Qualifier course', 'IIT Madras BS in Data Science and Applications, open without JEE.', 'https://onlinedegree.iitm.ac.in'],
      ['After your B.Tech', 'GATE, then M.Tech or PhD', 'IISc, IITs, ISRO, DRDO and research labs recruit through advanced degrees.', null]
    ],
    world: [
      ['United States', 'SAT or ACT where required, plus essays', 'MIT, Stanford, Carnegie Mellon, Berkeley and Georgia Tech lead in AI and robotics.', 'https://www.cmu.edu'],
      ['United Kingdom', 'UCAS, predicted grades, some entrance tests', 'Oxford, Cambridge, Imperial and Edinburgh teach AI and robotics.', 'https://www.ed.ac.uk'],
      ['Canada', 'Marks and a portfolio', 'Waterloo, Toronto and UBC pair strong AI labs with co-op placements.', 'https://uwaterloo.ca'],
      ['Germany and Switzerland', 'Marks and subject tests', 'ETH Zurich, EPFL, TU Munich and TU Delft run top engineering programmes.', 'https://ethz.ch'],
      ['Singapore and East Asia', 'Marks, tests and interviews', 'NUS, NTU and KAIST have strong robotics groups.', 'https://www.nus.edu.sg'],
      ['Indian degree, then abroad', 'GRE or GATE, research record', 'Finish a B.Tech, then apply for an MS or PhD overseas with project work to show.', null]
    ]
  },

  roles: {
    rob: ['Robotics engineer', 'You like machines you can hold and watch move.'],
    ml: ['Machine learning engineer', 'You like finding patterns in data and making predictions work.'],
    cv: ['Computer vision engineer', 'You like teaching a camera to understand what it sees.'],
    emb: ['Embedded and IoT engineer', 'You like small, efficient devices that run for months.'],
    res: ['AI researcher', 'You like asking why something works and proving it.'],
    ctl: ['Control and automation engineer', 'You like making systems behave exactly as intended.']
  },

  quiz: [
    ['It is a free Saturday. What do you build?', [
      ['A line-following car', { rob: 2, ctl: 1 }],
      ['An app that names plants from a photo', { cv: 2, ml: 1 }],
      ['A sensor board that texts when soil is dry', { emb: 2 }],
      ['A test of why one training trick beats another', { res: 2, ml: 1 }]
    ]],
    ['Which problem is most satisfying to fix?', [
      ['The arm overshoots its target', { ctl: 2, rob: 1 }],
      ['The model works by day and fails at night', { cv: 2, ml: 1 }],
      ['The battery dies in two hours', { emb: 2 }],
      ['Nobody knows why the network works', { res: 2 }]
    ]],
    ['Pick a tool for the day.', [
      ['A soldering iron and multimeter', { emb: 2, ctl: 1 }],
      ['A notebook full of graphs', { ml: 2, res: 1 }],
      ['A camera and a folder of images', { cv: 2 }],
      ['A CAD program and a 3D printer', { rob: 2 }]
    ]],
    ['Which subject do you reach for first?', [
      ['Physics', { rob: 1, ctl: 2 }],
      ['Mathematics', { res: 2, ml: 1 }],
      ['Computer science', { cv: 1, ml: 2 }],
      ['Electronics', { emb: 2, rob: 1 }]
    ]],
    ['What would you be proudest to show?', [
      ['A robot that finishes a maze alone', { rob: 2, ctl: 1 }],
      ['A dashboard that predicts something useful', { ml: 2 }],
      ['A paper that explains a new idea', { res: 2 }],
      ['A device that runs a year on a coin cell', { emb: 2 }]
    ]],
    ['Something breaks. What do you do first?', [
      ['Measure the signals', { ctl: 2, emb: 1 }],
      ['Look at the cases the model got wrong', { ml: 1, cv: 2 }],
      ['Read how others solved it', { res: 2 }],
      ['Swap a part and test again', { rob: 2, emb: 1 }]
    ]]
  ],

  parts: [
    ['cam', 'Camera', 12, ['see']],
    ['lidar', 'LiDAR', 30, ['see', 'range']],
    ['ultra', 'Ultrasonic sensor', 6, ['range']],
    ['imu', 'Motion sensor (IMU)', 8, ['balance']],
    ['gps', 'GPS module', 10, ['position']],
    ['wheels', 'Wheel drive', 15, ['move']],
    ['legs', 'Legged base', 35, ['move', 'balance']],
    ['arm', 'Gripper arm', 25, ['grip']],
    ['mcu', 'Microcontroller', 5, ['control']],
    ['jetson', 'Edge AI board', 30, ['think', 'control']],
    ['solar', 'Solar panel', 18, ['power']],
    ['battery', 'Battery pack', 10, ['power']],
    ['radio', 'Radio link', 8, ['talk']]
  ],

  needNames: {
    see: 'sees', range: 'measures distance', balance: 'keeps balance', position: 'knows its position',
    move: 'moves', grip: 'picks things up', control: 'runs motor control', think: 'runs an AI model',
    power: 'has power', talk: 'reports back'
  },

  missions: [
    ['Mars cave rover', 90, ['see', 'range', 'move', 'balance', 'power', 'talk', 'control']],
    ['Hospital delivery robot', 90, ['see', 'range', 'move', 'control', 'think']],
    ['Farm weeding robot', 115, ['see', 'position', 'move', 'think', 'power', 'grip']]
  ]
};
