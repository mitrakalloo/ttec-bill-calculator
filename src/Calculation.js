import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { calculateBill } from "./utilities";

const oldCostLevels = [0.26, 0.32, 0.37];
const oldLevels = [400, 600, 999999];

const newCostLevels = [0.28, 0.4, 0.54, 0.68];
const newLevels = [200, 500, 700, 999999];
const mth_fee = 7.5;

const calculateOldBill = (kwh) => {
  return (
    (
      (calculateBill({ cost: oldCostLevels, levels: oldLevels }, kwh * 2) + 6) *
      1.125
    ).toFixed(2) / 2
  );
};

const calculateNewBill = (kwh) => {
  return (
    (calculateBill({ cost: newCostLevels, levels: newLevels }, kwh) + mth_fee) *
    1.125
  ).toFixed(2);
};

const pricing = {
  frequencies: [
    { value: "monthly", label: "Monthly", priceSuffix: "/month" },
    { value: "annually", label: "Bi-Monthly", priceSuffix: "/bi-month" },
  ],
  tiers: [
    {
      name: "Old",
      id: "tier-startup",
      href: "#",
      price: {
        monthly: (k) => calculateOldBill(k),
        annually: (k) => calculateOldBill(k) * 2,
      },
      description: "old ttec billing values",
      features: [
        "25 products",
        "Up to 10,000 subscribers",
        "Advanced analytics",
        "24-hour support response time",
        "Marketing automations",
      ],
      mostPopular: false,
    },
    {
      name: "New",
      id: "tier-enterprise",
      href: "#",
      price: {
        monthly: (k) => calculateNewBill(k),
        annually: (k) => calculateNewBill(k) * 2,
      },
      description: "new proposed values",
      features: [
        "Unlimited products",
        "Unlimited subscribers",
        "Advanced analytics",
        "1-hour, dedicated support response time",
        "Marketing automations",
        "Custom reporting tools",
      ],
      mostPopular: true,
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calculation() {
  const [kwh, setKwh] = useState(200);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  return (
    <div className="bg-white">
      <main className="pb-10">
        {/* Pricing section */}
        <div className="px-6 mx-auto mt-16 max-w-7xl sm:mt-8 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-base font-semibold leading-7 text-indigo-600">
              Pricing
            </h1>
            {/* <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Pricing plans for teams of&nbsp;all&nbsp;sizes
            </p> */}

            <div>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">KWh</span>
                </div>
                <input
                  type="text"
                  name="kwh"
                  id="kwh"
                  className="block w-full rounded-md border-1 py-1.5 pl-16 pr-12 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                  value={kwh}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setKwh(e.target.value);
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    KWh/mth
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-center text-gray-600">
            Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
            loyalty, and driving sales.
          </p> */}
          <div className="flex justify-center mt-16">
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="grid grid-cols-2 p-1 text-xs font-semibold leading-5 text-center rounded-full gap-x-1 ring-1 ring-inset ring-gray-200"
            >
              <RadioGroup.Label className="sr-only">
                Payment frequency
              </RadioGroup.Label>
              {pricing.frequencies.map((option) => (
                <RadioGroup.Option
                  key={option.value}
                  value={option}
                  className={({ checked }) =>
                    classNames(
                      checked ? "bg-indigo-600 text-white" : "text-gray-500",
                      "cursor-pointer rounded-full px-2.5 py-1"
                    )
                  }
                >
                  <span>{option.label}</span>
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>
          <div className="grid max-w-md grid-cols-1 gap-8 mx-auto mt-10 isolate md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
            {pricing.tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "ring-2 ring-indigo-600"
                    : "ring-1 ring-gray-200",
                  "rounded-3xl p-8"
                )}
              >
                <h2
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                    "text-lg font-semibold leading-8"
                  )}
                >
                  {tier.name}
                </h2>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <p className="flex items-baseline mt-6 gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${tier.price[frequency.value](kwh)}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {frequency.priceSuffix}
                  </span>
                </p>
                {/* <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                      : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                    'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  )}
                >
                  Buy plan
                </a> */}
                {/* <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="flex-none w-5 h-6 text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul> */}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}