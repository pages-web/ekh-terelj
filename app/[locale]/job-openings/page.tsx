"use client"

import { useState } from "react"
import {
  Upload,
  ChevronDown,
  Check,
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  FileText,
} from "lucide-react"
import { gql, useMutation } from "@apollo/client"

const WIDGETS_SAVE_LEAD = gql`
  mutation widgetsSaveLead(
    $formId: String!
    $submissions: [FieldValueInput]
    $browserInfo: JSON!
    $cachedCustomerId: String
  ) {
    widgetsSaveLead(
      formId: $formId
      submissions: $submissions
      browserInfo: $browserInfo
      cachedCustomerId: $cachedCustomerId
    ) {
      status
      conversationId
      customerId
      errors {
        fieldId
        code
        text
        __typename
      }
      __typename
    }
  }
`

export default function JobOpenings() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    position: "",
    message: "",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const positions = [
    "I am interested in...",
    "Програмист",
    "Дизайнер",
    "Менежер",
    "Маркетинг мэргэжилтэн",
    "Борлуулалтын төлөөлөгч",
  ]

  const [saveLead, { loading }] = useMutation(WIDGETS_SAVE_LEAD)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.lastName ||
      !formData.phone ||
      !formData.email ||
      !formData.position ||
      !selectedFile
    ) {
      setNotification("Мэдээллийг бүрэн оруулна уу!")
      return
    }
    try {
      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
      }
      const submissions = [
        { _id: "name", type: "text", value: String(formData.name) },
        { _id: "lastName", type: "text", value: String(formData.lastName) },
        { _id: "phone", type: "text", value: String(formData.phone) },
        { _id: "email", type: "text", value: String(formData.email) },
        { _id: "position", type: "text", value: String(formData.position) },
        { _id: "message", type: "text", value: String(formData.message) },
        {
          _id: "cv",
          type: "text",
          value: selectedFile ? selectedFile.name : "",
        },
      ]
      await saveLead({
        variables: {
          formId: "ncnsWzkTgVd6ikRmYXHPX",
          submissions,
          browserInfo,
          cachedCustomerId: "-5wwdBJSWeBaOrgvEmXDW",
        },
      })
      setShowSuccessModal(true)
      setFormData({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        position: "",
        message: "",
      })
      setSelectedFile(null)
      setNotification(null)
    } catch (err) {
      setNotification("Алдаа гарлаа. Дахин оролдоно уу.")
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-8 sm:py-12 md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-12 text-center'>
          <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#113f52] to-[#113f52] shadow-lg'>
            <Briefcase className='h-10 w-10 text-white' />
          </div>
          <h1 className='mb-4 text-4xl font-bold text-gray-800'>
            Ажилын анкет
          </h1>
          <p className='text-lg text-gray-600'>
            Манай багт нэгдэх боломжийг бүү алдаарай
          </p>
        </div>

        <div className='mx-auto max-w-4xl'>
          {notification && (
            <div className='mb-6 rounded-xl bg-red-50 border border-red-200 p-4'>
              <p className='text-red-600 font-medium'>{notification}</p>
            </div>
          )}

          <div className='rounded-3xl bg-white p-8 md:p-10 shadow-2xl border border-gray-100'>
            <div className='grid gap-8 md:gap-10'>
              <div className='space-y-6'>
                <div className='flex items-center gap-3 border-b border-gray-200 pb-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#113f52]/10'>
                    <User className='h-5 w-5 text-[#113f52]' />
                  </div>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Хувийн мэдээлэл
                  </h2>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <User className='h-4 w-4' />
                      Нэр
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder='Таны нэр'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <User className='h-4 w-4' />
                      Овог
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder='Таны овог'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <Phone className='h-4 w-4' />
                      Утасны дугаар
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder='+976 99119911'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <Mail className='h-4 w-4' />
                      Имэйл
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='example@gmail.com'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='flex items-center gap-3 border-b border-gray-200 pb-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#113f52]/10'>
                    <Briefcase className='h-5 w-5 text-[#113f52]' />
                  </div>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Ажлын байр
                  </h2>
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                    <Briefcase className='h-4 w-4' />
                    Ажлын байрны нэр
                  </label>
                  <div className='relative'>
                    <button
                      type='button'
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className='flex w-full items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-left text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10'
                    >
                      <span
                        className={
                          formData.position ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {formData.position || "Ажлын байрыг сонгоно уу"}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className='absolute z-10 mt-2 w-full rounded-xl border-2 border-gray-200 bg-white shadow-xl'>
                        {positions.map((position, index) => (
                          <button
                            key={index}
                            type='button'
                            onClick={() => {
                              if (index !== 0) {
                                setFormData((prev) => ({ ...prev, position }))
                              }
                              setIsDropdownOpen(false)
                            }}
                            className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
                              index === 0
                                ? "cursor-default text-gray-400"
                                : "text-gray-700 hover:bg-[#113f52]/5"
                            } ${index === 1 ? "rounded-t-xl" : ""} ${
                              index === positions.length - 1
                                ? "rounded-b-xl"
                                : ""
                            }`}
                            disabled={index === 0}
                          >
                            {position}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='flex items-center gap-3 border-b border-gray-200 pb-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#113f52]/10'>
                    <FileText className='h-5 w-5 text-[#113f52]' />
                  </div>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Анкет файл
                  </h2>
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                    <Upload className='h-4 w-4' />
                    CV-гээ байруулуулна уу
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className='group cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-8 text-center transition-all duration-200 hover:border-[#113f52] hover:bg-[#113f52]/5'
                  >
                    <input
                      type='file'
                      onChange={handleFileSelect}
                      className='hidden'
                      id='file-upload'
                      accept='.pdf,.doc,.docx'
                    />
                    <label htmlFor='file-upload' className='cursor-pointer'>
                      <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#113f52] to-[#113f52] shadow-lg group-hover:scale-105 transition-transform duration-200'>
                        <Upload className='h-8 w-8 text-white' />
                      </div>
                      <p className='mb-2 text-lg font-medium text-gray-600'>
                        {selectedFile
                          ? selectedFile.name
                          : "Файлаа энд чирэн оруулна уу"}
                      </p>
                    </label>
                  </div>
                </div>
              </div>

              <div className='space-y-6'>
                <div className='flex items-center gap-3 border-b border-gray-200 pb-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#113f52]/10'>
                    <MessageSquare className='h-5 w-5 text-[#113f52]' />
                  </div>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Нэмэлт мэдээлэл
                  </h2>
                </div>

                <div className='space-y-2'>
                  <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                    <MessageSquare className='h-4 w-4' />
                    Мессеж
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder='Өөрийн тухай, туршлага, чадвараа товчхон бичнэ үү...'
                    rows={4}
                    className='w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                  />
                </div>
              </div>

              <div className='space-y-6 pt-6 border-t border-gray-200'>
                <div className='rounded-xl bg-gray-50 p-4 text-center text-sm leading-relaxed text-gray-600'>
                  <span>Маягтыг илгээснээр та манай </span>
                  <a
                    href='#'
                    className='font-medium text-[#113f52] underline hover:text-[#113f52]'
                  >
                    нууцлалын бодлого
                  </a>
                  <span>, </span>
                  <a
                    href='#'
                    className='font-medium text-[#113f52] underline hover:text-[#113f52]'
                  >
                    Үйлчилгээний нөхцөл
                  </a>
                  <span>-тэй зөвшөөрч байна</span>
                </div>

                <button
                  type='button'
                  onClick={handleSubmit}
                  disabled={loading}
                  className='w-full transform rounded-xl bg-gradient-to-r from-[#113f52] to-[#113f52] py-4 px-8 text-lg font-semibold text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  {loading ? "Илгээж байна..." : "Өргөдөл илгээх"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {showSuccessModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
            <div className='mx-auto w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl transform transition-all duration-300 scale-100'>
              <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg'>
                <Check className='h-10 w-10 text-white' />
              </div>

              <h2 className='mb-4 text-2xl font-bold text-gray-800'>
                Амжилттай илгээлээ!
              </h2>

              <p className='mb-8 text-gray-600 leading-relaxed'>
                Өргөдөл гаргасанд баярлалаа. Бид таны хүсэлтийг хүлээн авсан
                бөгөөд хянан үзэх болно. Та удахгүй имэйлээр хариу хүлээн авах
                болно.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className='rounded-xl bg-gradient-to-r from-[#113f52] to-[#113f52] px-8 py-3 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
              >
                Дуусгах
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
