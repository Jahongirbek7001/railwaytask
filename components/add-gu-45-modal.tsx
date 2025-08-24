'use client'

import React, { useState } from "react";
import { IoMdClose } from 'react-icons/io'
import { FaRegSave } from 'react-icons/fa'
import { supabase } from "@/lib/supabaseClient";


type ModalFormProps = {
  setOpen: (value: boolean) => void
  userid: string | null
  fullname: string | null
}

const AddGU45Modal: React.FC<ModalFormProps> = ({ setOpen, userid, fullname }) => {


  const [numberWagon, setNumberWagon] = useState("");
  const [cargo, setCargo] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [note, setNote] = useState("");
  const [feesType, setFeesType] = useState("");

  const [nomergu45, setNomergu45] = useState('')
  const [stansiya, setStansiya] = useState('')
  const [tippodacha, setTippodacha] = useState('')
  const [gruzovladelets, setGruzovladelets] = useState('')
  const [vetvevladelets, setVetvevladelets] = useState('')
  const [nomergu46, setNomergu46] = useState('')
  const [nomerfdu92, setNomerfdu92] = useState('')
  const [kommentariya, setKommentariya] = useState('')

  const [isContainerChecked, setIsContainerChecked] = useState(true);

  // submit funksiyasi
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // GU45 jadvaliga qo‘shamiz
    const { data, error } = await supabase
      .from("gu45")
      .insert([
        {
          nomergu45: nomergu45,
          stansiya: stansiya,
          tippodacha: tippodacha,
          gruzovladelets: gruzovladelets,
          vetvevladelets: vetvevladelets,
          nomergu46: nomergu46,
          nomerfdu92: nomerfdu92,
          kommentariya: kommentariya,
          avtor: fullname,
          gu45userid: userid, // eng muhim joy — foydalanuvchi bilan bog‘lash
        },
      ])
      .select();

    if (error) {
      console.error("Xatolik:", error.message);
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <div
        className="fixed inset-0 bg-white/10 bg-opacity-10 backdrop-blur-xs z-40"
        onClick={() => setOpen(false)}
      ></div>

      <div className=" w-[300px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[565px]  overflow-y-scroll m-auto fixed inset-0 z-50 p-4 bg-white rounded-lg shadow-xl" >
        <div>
          <p className=' text-center text-xl md:text-2xl'>Формирование строки ГУ-45</p>
          <hr className=" text-gray-300 my-3" />
        </div>

        <form className="px-6 pt-6 pb-4">
          <div className=' w-full flex flex-col md:flex-row justify-between items-center gap-5 mb-5 md:m-0'>
            <div className=' w-full'>
              <label className=" text-sm" htmlFor="nomergu45">№ вагонов</label>
              <input
                className='w-full border p-1 rounded border-gray-300'
                type="text"
                id='nomergu45'
                value={nomergu45}
                onChange={(e) => setNomergu45(e.target.value)}
              />
            </div>
            <div className=' w-full'>
              <label className=" text-sm" htmlFor="stansiya">Выберите груз по ЕТСНГ</label>
              <input
                className='w-full border p-1 rounded border-gray-300'
                type="text"
                id='stansiya'
                value={stansiya}
                onChange={(e) => setStansiya(e.target.value)}
              />
            </div>
            <div className=' w-full'>
              <label className=" text-sm" htmlFor="tippodacha">Число и часы подачи</label>
              <input
                className='w-full border p-1 rounded border-gray-300'
                type="date"
                id='tippodacha'
                value={tippodacha}
                onChange={(e) => setTippodacha(e.target.value)}
              />
            </div>
          </div>

          <div className=' w-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className=' w-full'>
              <label className=" text-sm" htmlFor="gruzovladelets">Примечание</label>
              <input
                className='w-full border p-1 rounded border-gray-300'
                type="text"
                id='gruzovladelets'
                value={gruzovladelets}
                onChange={(e) => setGruzovladelets(e.target.value)}
              />
            </div>
            <div className=' w-full'>
              <label className=" text-sm" htmlFor="vetvevladelets">Примечание</label>
              <input
                className='w-full border p-1 rounded border-gray-300'
                type="text"
                id='vetvevladelets'
                value={vetvevladelets}
                onChange={(e) => setVetvevladelets(e.target.value)}
              />
            </div>
            <div className=' w-full'>
              <label className=" text-sm" htmlFor="nomergu46">Примечание</label>
              <input
                className='w-full border p-1 rounded border-gray-300'
                type="text"
                id='nomergu46'
                value={nomergu46}
                onChange={(e) => setNomergu46(e.target.value)}
              />
            </div>
          </div>

          <div className=' w-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <div className=' w-full'>
              <label className=" text-sm" htmlFor="nomerfdu92">Примечание</label>
              <input
                className='w-full border p-1 rounded border-gray-300'
                type="text"
                id='nomerfdu92'
                value={nomerfdu92}
                onChange={(e) => setNomerfdu92(e.target.value)}
              />
            </div>
            <div className=' w-full'>
              <label className=" text-sm" htmlFor="kommentariya">Примечание</label>
              <textarea
                className='w-full border p-1 rounded border-gray-300'
                id='kommentariya'
                value={kommentariya}
                onChange={(e) => setKommentariya(e.target.value)}
              />
            </div>
          </div>

          <div className=" flex justify-end space-x-3 py-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cursor-pointer w-[130px] text-sm text-red-700 border-2 border-red-700 hover:bg-red-100 transition duration-500 font-semibold py-2 px-4 rounded-l  flex justify-center items-center gap-1">
              <IoMdClose /> ЗАКРЫТЬ
            </button>
            <button
              onClick={handleSave}
              type="submit"
              className="cursor-pointer w-[130px] text-sm text-green-700 border-2 border-green-700 hover:bg-green-100 transition duration-500 font-semibold py-2 px-4 rounded-r flex justify-center items-center gap-1">
              <FaRegSave /> Сохранить
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddGU45Modal;
