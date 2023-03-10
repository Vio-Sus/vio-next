import React, { useState } from 'react';
import { IoMdRemove } from 'react-icons/io';
interface Props {
    siteList: any;
    setSiteList: any;
}

export default function SiteListForm({ siteList, setSiteList }: Props) {
    const [newSite, setNewSite] = useState('');

    const handleAddSite = () => {
        if (newSite === '') return;
        if (!Array.isArray(siteList)) {
            setSiteList([{ name: newSite }]);
        } else {
            setSiteList([...siteList, { name: newSite }]);
        }
        setNewSite('');
    };
    return (
        <div>
            <div className="flex flex-col py-4">

                <label htmlFor="siteList" className="text-gray-700 font-medium mb-2">
                    Add sites
                </label>
                {Array.isArray(siteList) &&
                    siteList.map((site: any, index: number) => (
                        <div key={index} className="flex items-center justify-between mx-10">
                            <div>{site.name}</div>
                            <button
                                type="button"
                                onClick={() => {
                                    const newSiteList = siteList.filter((s: any) => s.name !== site.name);
                                    setSiteList(newSiteList);
                                }}>
                                <IoMdRemove />
                            </button>
                        </div>
                    ))}

                <input
                    type="text"
                    name="siteList"
                    id="siteList"
                    value={newSite}
                    onChange={(e) => setNewSite(e.target.value)}
                    className="w-full border border-gray-400 p-2 rounded-lg"
                />
            </div>
           
          
            <button 
            type="button"
            onClick={handleAddSite}  className="bg-[#80CF76] hover:bg-[#9FDF97] text-white font-bold py-2 px-4 rounded w-full">
                Add site
            </button>
            <p className="text-sm text-center pt-4 font-light text-gray-900 underline">
                click next to skip
            </p>
        </div>
    );
}
