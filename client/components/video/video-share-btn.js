import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactDOM from 'react-dom';

function VideoShareBtn() {
    const social = ['share', 'twitter', 'facebook', 'instagram'];
    const [step, setStep] = useState({
        index: 0,
        widthStart: 400,
        widthEnd: 400,
        leftStart: 0,
        leftEnd: 0,
    });

    const onCoverClick = () => {
        const { index } = step;
        const nextStep = (index + 1) % 3;
        if (index === 0) {
            setStep({
                index: nextStep,
                widthStart: 400,
                widthEnd: 100,
                leftStart: 0,
                leftEnd: 0,
            });
        }
        if (index === 2) {
            setStep({
                index: nextStep,
                widthStart: 100,
                widthEnd: 400,
                leftStart: step.leftEnd,
                leftEnd: 0,
            });
        }
    };

    const onSocialIconClick = (i) => {
        const { index } = step;
        if (index === 1) {
            setStep({
                index: 2,
                widthStart: 400,
                widthEnd: 100,
                leftStart: 0,
                leftEnd: i * 100,
            });
        }
    };

    const spring = useSpring({
        width: step.widthEnd,
        left: step.leftEnd,
        from: { width: step.widthStart, left: step.leftStart },
    });

    return (
        <div className="flex justify-center items-center h-screen overflow-hidden">
            <div className="w-400 h-100 bg-gray-200 relative rounded-full">
                <animated.div
                    style={spring}
                    className="w-400 h-100 absolute bg-gray-800 text-gray-200 rounded-full top-0 left-0 overflow-hidden flex cursor-pointer"
                    onClick={onCoverClick}
                >
                    <div className="w-100 flex justify-center items-center flex-shrink-0">
                        <Icon name={['share', 'more', 'tick'][step.index]} />
                    </div>
                    <div className="w-300 text-3xl font-bold flex justify-center items-center flex-shrink-0">
                        Share
                    </div>
                </animated.div>
                <div className="flex text-gray-800">
                    {social.map((name, index) => (
                        <div
                            key={index}
                            className={`w-100 h-100 flex justify-center items-center cursor-pointer ${index ? '' : 'text-gray-400'
                                }`}
                            onClick={() => {
                                if (index) {
                                    onSocialIconClick(index);
                                }
                            }}
                        >
                            <Icon name={name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


    function Icon({ name }) {
        const icons = {
            twitter: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12"
                    stroke="none"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                >
                    <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
                </svg>
            ),
            facebook: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12"
                    stroke="none"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                >
                    <path d="M288 176v-64c0-17.664 14.336-32 32-32h32V0h-64c-53.024 0-96 42.976-96 96v80h-64v80h64v256h96V256h64l32-80h-96z" />
                </svg>
            ),
            instagram: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12"
                    stroke="none"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                >
                    <path d="M352 0H160C71.648 0 0 71.648 0 160v192c0 88.352 71.648 160 160 160h192c88.352 0 160-71.648 160-160V160C512 71.648 440.352 0 352 0zm112 352c0 61.76-50.24 112-112 112H160c-61.76 0-112-50.24-112-112V160C48 98.24 98.24 48 160 48h192c61.76 0 112 50.24 112 112v192z" />
                    <path d="M256 128c-70.688 0-128 57.312-128 128s57.312 128 128 128 128-57.312 128-128-57.312-128-128-128zm0 208c-44.096 0-80-35.904-80-80 0-44.128 35.904-80 80-80s80 35.872 80 80c0 44.096-35.904 80-80 80z" />
                    <circle cx="393.6" cy="118.4" r="17.056" />
                </svg>
            ),
            share: (
                <svg
                    className="w-12"
                    stroke="none"
                    fill="currentColor"
                    viewBox="-21 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0" />
                    <path d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm0 0M453.332 426.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0" />
                    <path d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zm0 0M154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0" />
                    <path d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0" />
                    <path d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 01-10.535 2.797zm0 0M333.633 421.762c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0" />
                </svg>
            ),
            tick: (
                <svg
                    className="w-12"
                    stroke="none"
                    fill="currentColor"
                    viewBox="0 -46 417.813 417"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M159.988 318.582c-3.988 4.012-9.43 6.25-15.082 6.25s-11.094-2.238-15.082-6.25L9.375 198.113c-12.5-12.5-12.5-32.77 0-45.246l15.082-15.086c12.504-12.5 32.75-12.5 45.25 0l75.2 75.203L348.104 9.781c12.504-12.5 32.77-12.5 45.25 0l15.082 15.086c12.5 12.5 12.5 32.766 0 45.246zm0 0" />
                </svg>
            ),
            more: (
                <svg
                    className="w-12"
                    stroke="none"
                    fill="currentColor"
                    viewBox="0 -192 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M320 64c0 35.348-28.652 64-64 64s-64-28.652-64-64 28.652-64 64-64 64 28.652 64 64zm0 0M128 64c0 35.348-28.652 64-64 64S0 99.348 0 64 28.652 0 64 0s64 28.652 64 64zm0 0M512 64c0 35.348-28.652 64-64 64s-64-28.652-64-64 28.652-64 64-64 64 28.652 64 64zm0 0" />
                </svg>
            ),
        };

        return icons[name] || null;
    }


ReactDOM.render(<VideoShareBtn />, document.getElementById('root'));