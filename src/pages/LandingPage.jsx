import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/landing-logo.svg'

const features = [
    { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
    { name: 'Material', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover' },
    { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
    { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
    { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
    { name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.' },
]
  
export function LandingPage() {
    return (
        <div className="bg-white">
            <div className="mx-auto grid max-w-2xl grid-col-1 sm:flex-row items-center gap-x-8 gap-y-8 sm:gap-x-8 sm:gap-y-16 px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div className="sm:hidden w-full mx-auto text-center">
                    <span className="items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                        AI-Powered Website for Dermatologists
                    </span>
                </div>
                <div>
                    {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Summer styles are finally here
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care
                        if you live or die.
                    </p> */}
                    <div className="hidden sm:block w-full text-center sm:text-left sm:mb-5">
                        <span className="items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                            AI-Powered Website for Dermatologists
                        </span>
                    </div>
                    <h2 className="text-3xl text-center sm:text-left font-bold tracking-tight text-gray-900 sm:text-4xl">Launch your website in less than 30 seconds!</h2>
                    <p className="mt-4 text-sm text-gray-500 text-center sm:text-left">
                        Get your dermatology practice online effortlessly. Our AI-driven platform allows you to launch a fully-functional, professional website in just 30 seconds.
                    </p>
                    {/* <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">{feature.name}</dt>
                                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                            </div>
                        ))}
                    </dl> */}
                    <div class="py-5 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* <div>
                            <h3 class="sr-only">Description</h3>
                            <div class="space-y-6">
                            <p class="text-base text-gray-900">Get your dermatology practice online effortlessly. Our AI-driven platform allows you to launch a fully-functional, professional website in just 30 seconds. Simply answer a few basic questions, and we handle the rest.</p>
                            </div>
                        </div> */}
                        <div class="mt-5">
                            <h3 class="text-2xl font-bold text-gray-900 text-center">Key Highlights</h3>
                            <div class="mt-4">
                                <ul role="list" class="list-disc space-y-2 pl-6 sm:pl-4 text-sm">
                                    <li><span class="text-md"><span className="font-bold">AI-Generated Websites:</span> Answer a few questions, and our AI creates your site instantly.</span></li>
                                    <li><span class="text-md"><span className="font-bold">Easy to Edit:</span> Modify your website easily with our simple editor.</span></li>
                                    <li><span class="text-md"><span className="font-bold">Launch in 30 Seconds:</span> Get a fully functional site online in under 30 seconds.</span></li>                            
                                    <li><span class="text-md"><span className="font-bold">Customization Services:</span> Basic customization available after launch.</span></li>                            
                                    <li><span class="text-md"><span className="font-bold">100% Ownership:</span> Full access to the source code ensures complete ownership.</span></li>                            
                                </ul>
                            </div>
                        </div>
                        <div class="mt-10 text-center">
                            {/* <h2 class="text-2xl font-medium text-gray-900">Price: Rs. 9999 - Rs. 4999</h2> */}
                            <p
                                className="text-center inline-block rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-center text-white hover:bg-indigo-700"
                            >
                                Price: Rs. <span className="line-through">10,999</span> - Rs. 4999
                            </p>
                            {/* <div class="mt-4 space-y-6">
                                <p class="text-sm text-gray-600">Price: Rs. 9999 - Rs. 4999</p>
                            </div> */}
                        </div>
                        <Link
                            to={'/login'}
                            className="mt-10 inline-block rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-center font-medium text-white hover:bg-indigo-700"
                        >
                            Enter your phone number to get started 
                        </Link>
                    </div>
                </div>
                <div className="order-first sm:order-last">
                    <img
                        alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                        src={logo}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}
  