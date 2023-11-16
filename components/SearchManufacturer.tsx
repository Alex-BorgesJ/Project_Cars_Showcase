"use client";

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { Combobox, Transition } from '@headlessui/react'
import { manufacturers } from '@/constants';
import { SearchManufacturerProps } from '@/types'
import { isTemplateExpression } from 'typescript';

const SearchManufacturer = ({manufacturer, setManufacturer} : SearchManufacturerProps) => {
  const [querry, setQuerry] = useState('')
  const filteredManufacturers = querry === "" ? manufacturers : manufacturers.filter((item) => (
    item.toLowerCase().replace(/\s+/g, "")
    .includes(querry.toLowerCase().replace(/\s\+/g,"")
  )))

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer} >
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4 "
              alt="Car logo"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuerry(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="trancition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={()=>setQuerry('')}
          >
            <Combobox.Options>
                 { filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({active}) => `
                      relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                    `}
                    value={item}
                  >
                    {({selected, active}) => (
                      <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active? "text-white": "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                )
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer