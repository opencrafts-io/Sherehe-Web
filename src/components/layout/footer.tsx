import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faTiktok,
    faLinkedin,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

function Footer() {
    const socialLinks = [
        {
            name: "Instagram",
            icon: faInstagram,
            url: "https://www.instagram.com/opencrafts.io",
        },
        {
            name: "TikTok",
            icon: faTiktok,
            url: "https://www.tiktok.com/@opencrafts",
        },
        {
            name: "LinkedIn",
            icon: faLinkedin,
            url: "https://www.linkedin.com/in/opencrafts-io-a10339368",
        },
        {
            name: "GitHub",
            icon: faGithub,
            url: "https://github.com/opencrafts-io",
        },
    ];

    const footerLinkClass =
        "w-fit text-sm font-normal text-gray-500 transition-colors duration-200 hover:text-primary hover:underline underline-offset-4";

    const sectionHeadingClass =
        "mb-2 text-sm font-semibold uppercase tracking-wider text-gray-900";

    return (
        <footer className="border-t border-gray-200 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                {/* Main Footer */}
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16">

                    {/* Sherehe Branding */}
                    <div className="col-span-2 flex max-w-sm flex-col md:col-span-1">
                        <p className="text-3xl font-bold tracking-tight text-primary">
                            Sherehe
                        </p>

                        <p className="mt-4 text-sm leading-7 text-gray-500">
                            Discover and create unforgettable experiences
                            with the best student platform.
                        </p>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col items-start gap-3">
                        <p className={sectionHeadingClass}>
                            Company
                        </p>

                        <a
                            href="https://opencrafts.io/products/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={footerLinkClass}
                        >
                            Products
                        </a>

                        <a
                            href="https://opencrafts.io/services"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={footerLinkClass}
                        >
                            Services
                        </a>

                        <a
                            href="https://opencrafts.io/about"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={footerLinkClass}
                        >
                            About
                        </a>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col items-start gap-3">
                        <p className={sectionHeadingClass}>
                            Legal
                        </p>

                        <a
                            href="https://opencrafts.io/policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={footerLinkClass}
                        >
                            Privacy Policy
                        </a>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col items-start">
                        <p className={sectionHeadingClass}>
                            Connect
                        </p>

                        <div className="mt-1 flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-primary hover:text-white hover:shadow-md"
                                >
                                    <FontAwesomeIcon
                                        icon={social.icon}
                                        className="text-lg"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="my-10 border-t border-gray-200" />

                {/* Copyright */}
                <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FontAwesomeIcon
                            icon={faCopyright}
                            className="text-gray-400"
                        />

                        <span>
                            {new Date().getFullYear()} Open Crafts Interactive.
                            All rights reserved.
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;