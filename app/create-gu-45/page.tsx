'use client'

import React, { useState } from 'react'
import { GrClearOption } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { adddatagu45 } from '@/store/adddatagu45';
import { FaExclamationTriangle } from 'react-icons/fa'


const CreateGU45 = () => {

  const [open, setOpen] = useState(false)
  return (
    <React.Fragment>
      <div className="min-h-screen p-5 bg-gray-100">
        <div className=" w-full bg-white rounded-2xl p-5">
          <div>
            <h2 className="text-xl font-semibold leading-tight mb-5">Список ГУ-45</h2>
          </div>
          <hr className=" text-gray-300 my-5" />
          <div>
            <p className=' text-gray-400 text-xl my-2'>Строка вагонов</p>
            <button
              onClick={() => setOpen(true)}
              className="h-full py-1 px-5 mb-3 border border-gray-300 cursor-pointer rounded bg-green-500 hover:bg-green-600 text-white "
            >
              Добавить строку
            </button>
          </div>
          <div className="overflow-x-auto" >
            <div className="w-full inline-block shadow rounded-lg p-1 overflow-auto max-h-[400px]">
              <div className="flex">
                <table className="w-full text-[12px] mx-auto bg-white border space-y-1 text-zinc-800 ">
                  <thead className='w-full h-full border-collapse'>
                    <tr className="sticky top-0 z-10 bg-white">
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">№ вагонов</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Код вагона</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Тип и номер контейнера</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Клиента</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Наименование груза</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Число подачи</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Число окончания</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Число уборки</th>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300">Примечание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adddatagu45.map((i, index) => (
                      <React.Fragment key={index}>
                        <tr className={
                          index % 2 === 1
                            ? "text-left border bg-gray-100"
                            : "text-left border"
                        }
                        >
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.wagonNumber}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.wagonCode}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.containerTypeAndNumber}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.client}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.cargoName}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.arrivalDate}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.completionDate}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.removalDate}</td>
                          <td className='px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300'>{i.note}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <table className="w-full text-[12px] mx-auto bg-white border space-y-1 text-zinc-800 ">
                  <thead className='w-full h-full  border-collapse'>
                    <tr>
                      <th className="px-5 py-6 xl:py-2 border border-gray-300" colSpan={10}>Доп. ж.д. услуга</th>
                    </tr>
                    <tr>
                      <th className="p-1 border border-gray-300">4.1-4.2 <br />Большое кузов</th>
                      <th className="p-1 border border-gray-300">6.1 <br />Перевеска ж.д.</th>
                      <th className="p-1 border border-gray-300">9.1 <br />Определённые периоды</th>
                      <th className="p-1 border border-gray-300">7.1 <br />Пломба</th>
                      <th className="p-1 border border-gray-300">16.1 <br />Очистка</th>
                      <th className="p-1 border border-gray-300">Промывка</th>
                      <th className="p-1 border border-gray-300">2.5 <br />Траферет</th>
                      <th className="p-1 border border-gray-300">2.9 <br />Уведомления</th>
                      <th className="p-1 border border-gray-300">2.1-2.2 <br />Особых условиях</th>
                      <th className="px-5 border border-gray-300" rowSpan={2}></th>
                    </tr>
                    <tr>
                      <th className="p-1 border border-gray-300" colSpan={9}>Все</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adddatagu45.map((i, index) => (
                      <React.Fragment key={index}>
                        <tr className={
                          index % 2 === 1
                            ? "text-left border bg-gray-100"
                            : "text-left border"
                        }>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={i.bigBody} readOnly />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={i.railwayTransfer} readOnly />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={i.specificPeriods} readOnly />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input
                              type="number"
                              value={i.seal}
                              readOnly
                              className="w-full border-none bg-transparent text-center"
                            />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={i.cleaning} readOnly />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={i.washing} readOnly />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={i.stencil} readOnly />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={i.telegraphNotification} readOnly />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <input type="checkbox" checked={i.specialConditions} readOnly />
                          </td>
                          <td className="px-3 py-6 xl:py-2 h-[100px] xl:h-[70px] border border-gray-300">
                            <span
                              className="relative px-3 py-1 font-semibold text-yellow-900 leading-tight  flex justify-center">
                              <span aria-hidden
                                className="absolute inset-0 bg-yellow-300 opacity-50 rounded-full"></span>
                              <button className=" cursor-pointer font-semibold text-[12px] ">
                                <span>Редактировать</span>
                              </button>
                            </span>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="mt-2 xs:mt-0 flex gap-3">
                <button
                  className="cursor-pointer w-[130px] text-sm text-indigo-700 border-2 border-indigo-700 hover:bg-indigo-100 transition duration-500 font-semibold py-2 px-4 rounded-l  flex justify-center items-center gap-1">
                  <IoMdArrowBack /> Назад
                </button>
                <button
                  className="cursor-pointer w-[130px] text-sm border-2 text-red-700 border-red-700 hover:bg-red-100 transition duration-500 font-semibold py-2 px-4 flex justify-center items-center gap-1">
                  <GrClearOption /> Очистить
                </button>
                <button
                  className="cursor-pointer w-[130px] text-sm text-indigo-700 border-2 border-indigo-700 hover:bg-indigo-100 transition duration-500 font-semibold py-2 px-4 rounded-r flex justify-center items-center gap-1">
                  <FaRegSave /> Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <>
          {/* Orqa fonni qoraytirish */}
          <div className="fixed inset-0 bg-white/10 bg-opacity-10 backdrop-blur-xs z-40"
           onClick={() => setOpen(false)}
          ></div>

          {/* Modal */}
          <div className="w-[50%] h-[500px] m-auto fixed inset-0 z-50 flex items-start justify-start p-4" >
            <div className="bg-white rounded-lg shadow-xl w-full h-full"
            >
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Deactivate account
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  )
}

export default CreateGU45