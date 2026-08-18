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
            <footer className="border-t border-gray-200 bg-white">
                <div className="px-8 py-10">
                    {/* First Section */}
                    <div className="mx-auto flex max-w-7xl justify-between gap-12">
                        {/* Sherehe logo */}
                        <div className="flex max-w-sm flex-col">
                            <p className="text-3xl font-bold">Sherehe</p>
                            <p className="mt-2 text-sm leading-6">Discover and create unforgettable experiences with the best Student's Platform</p>
                        </div>
                        {/* Company */}
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold uppercase">Company</p>
                            <a href="" className="text-sm hover:underline">About</a>
                            <a href="" className="text-sm hover:underline">Contact</a>
                        </div>
                        {/* Legal */}
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold uppercase">Legal</p>
                            <a href="" className="text-sm hover:underline">Terms of Service</a>
                            <a href="" className="text-sm hover:underline">Privacy Policy</a>
                        </div>
                        {/* Connect */}
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold uppercase">Connect</p>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                        <FontAwesomeIcon icon={social.icon} className="text-xl transition-transform hover:scale-110" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Divider */}
                    <hr className="mx-auto my-8 max-w-7xl items-center gap-2 text-sm" />
                    {/* Copyright Section */}
                    <div className="mx-auto flex max-w-7xl items-center gap-2 text-sm">
                        <FontAwesomeIcon icon={faCopyright} />
                        <span>{new Date().getFullYear()} Open Crafts Interactive. All rights reserved</span>
                    </div>
                </div>

            </footer>
        </>
    );
}

export default Footer;