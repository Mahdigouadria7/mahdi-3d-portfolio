export interface Project {
    slug: string;
    title: string;
    category: string;
    description: string;
    client: string;
    role: string;
    timeline: string;
    techStack: string[];
    fullDescription: string;
    challenge: string;
    solution: string;
    media: { type: 'image' | 'video', url: string, alt: string }[];
    accent?: string; // fuchsia | cyan | violet | amber | rose | emerald
}

export const projects: Project[] = [
    {
        slug: "trionda-ball-wc-2026",
        accent: "fuchsia",
        title: "TRIONDA BALL WC 2026",
        category: "Product Design",
        description: "Custom 3D model design and interactive web integration for the World Cup 2026 Trionda Ball concept.",
        client: "FIFA Concepts",
        role: "Lead 3D Designer & Web Developer",
        timeline: "Q3 2025",
        techStack: ["Blender", "React Three Fiber", "Next.js", "Tailwind CSS"],
        fullDescription: "A fully interactive, high-fidelity 3D visualization of the conceptual Trionda Ball for the 2026 World Cup.",
        challenge: "Optimizing a heavily detailed, multi-material Blender model to run flawlessly at 60fps on mobile.",
        solution: "Aggressive texture baking, Draco compression, and dynamic environment mapping in React Three Fiber.",
        media: [
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784898993/portfolio/trionda/cover_ball.webp', alt: 'Trionda Ball Material Close Up' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784898994/portfolio/trionda/render_ball.webp', alt: 'Trionda Ball Wireframe Overlay' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784898995/portfolio/trionda/stadium_mockup.webp', alt: 'Interactive Web Player Showcase' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784898996/portfolio/trionda/street_billboard.webp', alt: 'Street Billboard' }
        ]
    },
    {
        slug: "redbull-gold-concept",
        accent: "amber",
        title: "RED BULL GOLD CONCEPT",
        category: "Luxury Concept & 3D CGI",
        description: "Ultra-premium luxury gold concept edition for Red Bull, featuring custom 3D packaging, metallic shaders, and high-end CGI visualization.",
        client: "Red Bull (Concept)",
        role: "Lead 3D & CGI Designer",
        timeline: "2025",
        techStack: ["Blender", "Substance Painter", "Octane Render", "React Three Fiber"],
        fullDescription: "An exclusive, high-end luxury re-imagining of the iconic Red Bull energy can — crafted with polished gold surfaces, intricate metallic embossing, and high-impact cinematic staging.",
        challenge: "Capturing photorealistic gold reflections, intricate micro-embossing, and luxury metallic highlights while optimizing real-time 3D assets for fluid web performance.",
        solution: "Custom PBR gold texture maps, physically-based studio HDRI lighting, and Draco-compressed geometry tailored for interactive web display.",
        media: [
            { type: 'video', url: 'https://res.cloudinary.com/zu63qo7h/video/upload/v1784899265/portfolio/redbull/darkgold_render_video.mp4', alt: 'Cinematic Gold Render Video' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899273/portfolio/redbull/ticket2.png', alt: 'VIP Launch Event Pass' },
            { type: 'video', url: 'https://res.cloudinary.com/zu63qo7h/video/upload/v1784899377/portfolio/redbull/redbull_smoke.mp4', alt: 'Red Bull Smoke Simulation' },
            { type: 'video', url: 'https://res.cloudinary.com/zu63qo7h/video/upload/v1784899475/portfolio/redbull/redbull_loop.mp4', alt: 'Red Bull Infinite Physics Loop' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899905/portfolio/redbull/liwa_redbull_2.webp', alt: 'Liwa Desert Staging Render 1' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899907/portfolio/redbull/liwa_redbull_3.webp', alt: 'Liwa Desert Staging Render 2' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899913/portfolio/redbull/redbull_gold_darker.webp', alt: 'Deep Gold Specular Pass' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899924/portfolio/redbull/redbull_gold_2.webp', alt: 'Micro-Embossed Gold Can' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899929/portfolio/redbull/redbullr.webp', alt: 'Gold Master Render' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899935/portfolio/redbull/redbull_environmet_xt.webp', alt: 'Obsidian Studio High-Key' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899938/portfolio/redbull/redbull_environmet.webp', alt: 'Obsidian Studio Mid-Pass' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899941/portfolio/redbull/redbull_environmetsss.webp', alt: 'Obsidian Studio Subsurface' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899943/portfolio/redbull/viewport_darkgold.webp', alt: 'Viewport Wireframe Pass' },
            { type: 'image', url: 'https://res.cloudinary.com/zu63qo7h/image/upload/v1784899948/portfolio/redbull/teasing_redbull.gif', alt: 'Teaser Motion GIF' },
            { type: 'video', url: 'https://res.cloudinary.com/zu63qo7h/video/upload/v1784900036/portfolio/redbull/darkgold_redbull.mp4', alt: 'Lighting & Specular Pass' },
            { type: 'video', url: 'https://res.cloudinary.com/zu63qo7h/video/upload/v1784900082/portfolio/redbull/loop_linkedin.mp4', alt: 'LinkedIn Reel' },
            { type: 'video', url: 'https://res.cloudinary.com/zu63qo7h/video/upload/v1784900161/portfolio/redbull/redbull_3slides.mp4', alt: '3-Slides Motion Presentation' }
        ]
    },
    {
        slug: "lg-electronics",
        accent: "violet",
        title: "LG Electronics",
        category: "Product Visualization",
        description: "High-fidelity 3D product visualizations for LG's consumer electronics lineup.",
        client: "LG Global",
        role: "3D Artist",
        timeline: "2023",
        techStack: ["Maya", "V-Ray", "Photoshop"],
        fullDescription: "Ultra-realistic studio product renders for LG's flagship home appliance and television lines.",
        challenge: "Perfect lighting setups for brushed metal and reflective glass surfaces across dozens of products.",
        solution: "Developed a proprietary HDRI studio lighting rig for rapid, standardized rendering.",
        media: []
    },
    {
        slug: "event-cgi-oman",
        accent: "amber",
        title: "Event CGI — Oman",
        category: "Spatial Design",
        description: "Immersive 3D spatial designs and CGI for large-scale events and congresses.",
        client: "Oman Ministry of Tourism",
        role: "Spatial Designer",
        timeline: "2024",
        techStack: ["Unreal Engine", "Blender"],
        fullDescription: "Pre-visualization and environmental design for a massive tech congress in Muscat.",
        challenge: "Visualizing scale accurately so stakeholders could approve physical stage builds.",
        solution: "Built a fully navigable VR experience in Unreal Engine for stakeholder walkthroughs.",
        media: []
    },
    {
        slug: "cyberpunk-cityscape",
        accent: "rose",
        title: "Cyberpunk Cityscape",
        category: "Environment Design",
        description: "A sprawling futuristic city rendered in Unreal Engine 5 with raytraced lighting.",
        client: "Personal Project",
        role: "Environment Artist",
        timeline: "2023",
        techStack: ["Unreal Engine 5", "Megascans"],
        fullDescription: "An exploration of dense, vertical architecture and neon-drenched atmospheric lighting.",
        challenge: "Maintaining a playable framerate with thousands of volumetric lights and reflective puddles.",
        solution: "Leveraged Nanite and Lumen in UE5 for real-time global illumination without baked lighting.",
        media: []
    },
    {
        slug: "hypercar-configurator",
        accent: "emerald",
        title: "Hypercar Configurator",
        category: "Interactive 3D",
        description: "A real-time WebGL car configurator with highly detailed interior and exterior rendering.",
        client: "Automotive Startup",
        role: "WebGL Developer",
        timeline: "2025",
        techStack: ["Three.js", "WebGL", "Vue.js"],
        fullDescription: "A browser-based interactive configurator for customizing a luxury hypercar.",
        challenge: "Loading a high-poly car model over standard web connections without long wait times.",
        solution: "Aggressive LOD swapping and progressive texture loading.",
        media: []
    },
    {
        slug: "nike-air-max-promo",
        accent: "fuchsia",
        title: "Nike Air Max Promo",
        category: "Motion Design",
        description: "Abstract cloth simulations and dynamic camera moves for a sneaker campaign.",
        client: "Nike (Concept)",
        role: "VFX Artist",
        timeline: "2023",
        techStack: ["Houdini", "Redshift"],
        fullDescription: "Conceptual commercial piece blending hyper-realistic shoe rendering with surreal cloth simulations.",
        challenge: "Simulating cloth that behaved realistically around the sneaker's complex geometry.",
        solution: "Houdini's Vellum solver with custom constraints for art-directable cloth simulations.",
        media: []
    },
    {
        slug: "medical-animation",
        accent: "cyan",
        title: "Medical Animation",
        category: "Scientific Viz",
        description: "Accurate cellular level animations for a biotech startup's pitch deck.",
        client: "BioTech Innovators",
        role: "Scientific Animator",
        timeline: "2024",
        techStack: ["Blender", "Geometry Nodes"],
        fullDescription: "Visualizing the mechanism of action for a novel cellular therapy.",
        challenge: "Making scientifically accurate microscopic environments look visually appealing.",
        solution: "Stylized shading and depth of field for a cinematic 'inner space' look.",
        media: []
    },
    {
        slug: "archviz-penthouse",
        accent: "amber",
        title: "ArchViz Penthouse",
        category: "Architectural Viz",
        description: "Photorealistic renders of a luxury penthouse overlooking the New York skyline.",
        client: "Luxury Real Estate",
        role: "ArchViz Artist",
        timeline: "2023",
        techStack: ["3ds Max", "Corona Renderer"],
        fullDescription: "Marketing renders for a multi-million dollar property.",
        challenge: "Balancing interior artificial lighting with overwhelming natural light from floor-to-ceiling windows.",
        solution: "Corona's LightMix feature to perfectly balance exposure in post-production.",
        media: []
    },
    {
        slug: "abstract-loops",
        accent: "violet",
        title: "Abstract Loops",
        category: "Generative Art",
        description: "A series of satisfying, seamlessly looping abstract 3D animations.",
        client: "Various",
        role: "3D Artist",
        timeline: "2022–2024",
        techStack: ["Cinema 4D", "Redshift"],
        fullDescription: "A collection of daily renders focusing on satisfying motion and vibrant color palettes.",
        challenge: "Unique motion concepts daily.",
        solution: "Procedural animation tools to generate complex motion quickly.",
        media: []
    },
    {
        slug: "character-rigging",
        accent: "rose",
        title: "Character Rigging",
        category: "Technical Art",
        description: "Advanced facial and body rigging for a next-gen AAA game character.",
        client: "Game Studio",
        role: "Technical Artist",
        timeline: "2024",
        techStack: ["Maya", "Python"],
        fullDescription: "Custom python-based auto-rigger for humanoid characters.",
        challenge: "Rig flexible enough for extreme poses with realistic muscle deformation.",
        solution: "Hybrid bone and corrective blendshape system driven by joint angles.",
        media: []
    }
];
