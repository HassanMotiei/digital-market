import React from 'react';
import {CheckIcon} from '@heroicons/react/20/solid';

export default function PricingPage() {
    return (
        <div className="container mx-auto">
            <div className="my-10 box-border flex flex-col items-center justify-evenly rounded-md border-[1px] py-10 md:py-32">
                <div className="text-lg font-bold text-indigo-600 md:text-xl">
                    Pricing
                </div>
                <div className="mt-2 text-center text-3xl font-bold md:text-5xl">
                    Pricing plans for teams of all sizes
                </div>
                <div className="mx-4 mt-4 w-full text-center text-lg md:mx-64 md:mt-6 md:w-[42rem]">
                    Distinctio et nulla eum soluta et neque labore quibusdam.
                    Saepe et quasi iusto modi velit ut non voluptas in.
                    Explicabo id ut laborum.
                </div>
                <div className="mt-5 flex flex-col items-center justify-center md:flex-row">
                    <div className="mt-8 box-border flex h-[32rem] max-w-[26rem] flex-col justify-between space-y-10 rounded-t-3xl border-[1px] p-[2.5rem] lg:max-w-[24rem] lg:space-y-0 lg:rounded-r-none lg:border-r-0">
                        <div>
                            <div className="text-lg font-bold">Freelancer</div>
                            <div className="mt-4 text-sm">
                                The essentials to provide your best work for
                                clients.
                            </div>
                            <div className="mt-6 text-sm">
                                <span className="text-3xl font-bold">$24</span>
                                /month
                            </div>

                            <ul className="mt-8">
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    5 products
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Up to 1,000 subscribers
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Basic analytics
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    48-hour support response time
                                </li>
                            </ul>
                        </div>
                        <button className="mt-8 box-border h-11 w-full rounded-md border-[1px] border-indigo-600 px-3 py-2 font-bold text-indigo-600">
                            Buy plan
                        </button>
                    </div>

                    <div className="border-1  box-border flex h-[34rem] max-w-[26rem] flex-col justify-between space-y-10 rounded-t-3xl p-[2.5rem] lg:max-w-[24rem] lg:space-y-0">
                        <div>
                            <div className="flex flex-row items-center justify-between text-indigo-600">
                                <div className="text-lg font-bold ">
                                    Startup
                                </div>
                                <div className="rounded-full bg-indigo-50 px-2.5 py-1.5 text-xs font-bold">
                                    Most popular
                                </div>
                            </div>
                            <div className="mt-4 text-sm">
                                A plan that scales with your rapidly growing
                                business.
                            </div>
                            <div className="mt-6 text-sm">
                                <span className="text-3xl font-bold">$32</span>
                                /month
                            </div>

                            <ul className="mt-8">
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    25 products
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Up to 10,000 subscribers
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Advanced analytics
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    24-hour support response time
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Marketing automations
                                </li>
                            </ul>
                        </div>
                        <button className="mt-8 box-border h-11 w-full rounded-md border-[1px] bg-indigo-600 px-3 py-2 font-bold text-white">
                            Buy plan
                        </button>
                    </div>

                    <div className="mt-8 box-border flex h-[32rem] max-w-[26rem] flex-col justify-between space-y-10 rounded-t-3xl border-[1px] p-[2.5rem] lg:max-w-[24rem] lg:space-y-0 lg:rounded-l-none lg:border-l-0">
                        <div>
                            <div className="text-lg font-bold">Enterprise</div>
                            <div className="mt-4 text-sm">
                                Dedicated support and infrastructure for your
                                company.
                            </div>
                            <div className="mt-6 text-sm">
                                <span className="text-3xl font-bold">$48</span>
                                /month
                            </div>

                            <ul className="mt-8">
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Unlimited products
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Unlimited subscribers
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Advanced analytics
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    1-hour, dedicated support response time
                                </li>
                                <li className="mt-3 flex items-end text-sm">
                                    <CheckIcon className="mr-2 h-5 w-5 text-indigo-600" />
                                    Marketing automations
                                </li>
                            </ul>
                        </div>
                        <button className="mt-8 box-border h-11 w-full rounded-md border-[1px] border-indigo-600 px-3 py-2 font-bold text-indigo-600">
                            Buy plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
