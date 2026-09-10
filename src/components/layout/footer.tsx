import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

function Footer() {
    const socialLinks = [
        {
            name: "Instagram",
            icon: faInstagram,
            url: "https://instagram.com/",
        },
        {
            name: "TikTok",
            icon: faTiktok,
            url: "https://tiktok.com/",
        },
        {
            name: "LinkedIn",
            icon: faLinkedin,
            url: "https://linkedin.com/",
        },
        {
            name: "GitHub",
            icon: faGithub,
            url: "https://github.com/",
        },
    ];

    return (
        <>
            <footer className="border-t border-gray-200 bg-slate-50">
                <div className="px-8 py-10">
                    {/* First Section */}
                    <div className="mx-auto flex flex-col max-w-7xl gap-4 lg:flex-row lg:justify-between lg:gap-6">
                        {/* Sherehe logo */}
                        <div className="flex max-w-sm flex-col">
                            <p className="text-3xl font-bold">Sherehe</p>
                            <p className="mt-3 text-base leading-6">Discover and create unforgettable experiences with the best Student's Platform</p>
                        </div>
                        {/* Company */}
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold uppercase">Company</p>
                            <a href="" className="text-base hover:underline">About</a>
                            <a href="" className="text-base hover:underline">Contact</a>
                        </div>
                        {/* Legal */}
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold uppercase">Legal</p>
                            <a href="" className="text-base hover:underline">Terms of Service</a>
                            <a href="" className="text-base hover:underline">Privacy Policy</a>
                        </div>
                        {/* Connect */}
                        <div className="flex flex-col gap-3">
                            <p className="font-semibold uppercase">Connect</p>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                        <FontAwesomeIcon icon={social.icon} className="text-2xl transition-transform hover:scale-110" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Divider */}
                    <hr className="mx-auto my-8 max-w-7xl items-center gap-2 text-base" />
                    {/* Copyright Section */}
                    <div className="mx-auto flex max-w-7xl items-center gap-2 text-base">
                        <FontAwesomeIcon icon={faCopyright} />
                        <span>{new Date().getFullYear()} Open Crafts Interactive. All rights reserved</span>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;