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
    jobName: "",
    maritalStatus: "",
    education: "",
    advantage: "",
    skill: "",
    level: "",
    shortSummary: "",
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const [saveLead, { loading }] = useMutation(WIDGETS_SAVE_LEAD)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (
      !formData.jobName ||
      !formData.maritalStatus ||
      !formData.education ||
      !formData.advantage ||
      !formData.skill ||
      !formData.level ||
      !formData.shortSummary
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
        { _id: "jobName", type: "text", value: String(formData.jobName) },
        {
          _id: "maritalStatus",
          type: "text",
          value: String(formData.maritalStatus),
        },
        { _id: "education", type: "text", value: String(formData.education) },
        { _id: "advantage", type: "text", value: String(formData.advantage) },
        { _id: "skill", type: "text", value: String(formData.skill) },
        { _id: "level", type: "text", value: String(formData.level) },
        {
          _id: "shortSummary",
          type: "text",
          value: String(formData.shortSummary),
        },
      ]
      await saveLead({
        variables: {
          formId: "jQ9egMCPP0aSQpa7NNSed",
          submissions,
          browserInfo,
          cachedCustomerId: "-5wwdBJSWeBaOrgvEmXDW",
        },
      })
      setShowSuccessModal(true)
      setFormData({
        jobName: "",
        maritalStatus: "",
        education: "",
        advantage: "",
        skill: "",
        level: "",
        shortSummary: "",
      })
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
                    <Briefcase className='h-5 w-5 text-[#113f52]' />
                  </div>
                  <h2 className='text-xl font-semibold text-gray-800'>
                    Ажлын мэдээлэл
                  </h2>
                </div>

                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <Briefcase className='h-4 w-4' />
                      Таны сонирхож буй ажлын нэр:
                    </label>
                    <input
                      type='text'
                      name='jobName'
                      value={formData.jobName}
                      onChange={handleInputChange}
                      placeholder='Таны сонирхож буй ажлын нэр'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <User className='h-4 w-4' />
                      Гэр бүлийн байдал
                    </label>
                    <input
                      type='text'
                      name='maritalStatus'
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      placeholder='Гэр бүлийн байдал'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <FileText className='h-4 w-4' />
                      Боловсрол
                    </label>
                    <input
                      type='text'
                      name='education'
                      value={formData.education}
                      onChange={handleInputChange}
                      placeholder='Боловсрол'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <Briefcase className='h-4 w-4' />
                      Та ажил мэргэжлийнхээ хувьд бусдаас юугаараа давуу вэ?
                    </label>
                    <textarea
                      name='advantage'
                      value={formData.advantage}
                      onChange={handleInputChange}
                      placeholder='Та ажил мэргэжлийнхээ хувьд бусдаас юугаараа давуу вэ?'
                      rows={3}
                      className='w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <Briefcase className='h-4 w-4' />
                      Мэргэшилтэй холбоотой бусад чадварууд
                    </label>
                    <input
                      type='text'
                      name='skill'
                      value={formData.skill}
                      onChange={handleInputChange}
                      placeholder='Мэргэшилтэй холбоотой бусад чадварууд'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <MessageSquare className='h-4 w-4' />
                      Гадаад хэлний мэдлэгийн түвшин
                    </label>
                    <input
                      type='text'
                      name='level'
                      value={formData.level}
                      onChange={handleInputChange}
                      placeholder='Гадаад хэлний мэдлэгийн түвшин'
                      className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <MessageSquare className='h-4 w-4' />
                      Товч танилцуулга
                    </label>
                    <textarea
                      name='shortSummary'
                      value={formData.shortSummary}
                      onChange={handleInputChange}
                      placeholder='Товч танилцуулга'
                      rows={4}
                      className='w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>
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
                  {loading ? "Илгээж байна..." : "Илгээх"}
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
