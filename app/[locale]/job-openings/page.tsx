"use client"

import { useState } from "react"
import {
  Check,
  User,
  Mail,
  Phone,
  Briefcase,
  MessageCircle,
} from "lucide-react"
import { gql, useMutation, useQuery } from "@apollo/client"
import React from "react"

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

const GET_FORM_DETAIL = gql`
query FormDetail($id: String!) {
  formDetail(_id: $id) {
    _id
    name
    title
    code
    type
    description
    buttonText
    numberOfPages
    status
    googleMapApiKey
    integrationId
    fields {
      _id
      associatedFieldId
      associatedField {
        _id
        contentType
        __typename
      }
      column
      content
      contentType
      contentTypeId
      description
      field
      isRequired
      order
      pageNumber
      productCategoryId
      regexValidation
      text
      options
      type
      validation
      logicAction
      logics {
        fieldId
        logicOperator
        logicValue
        __typename
      }
      __typename
    }
    visibility
    leadData
    languageCode
    departmentIds
    brandId
    brand {
      _id
      name
      __typename
    }
    __typename
  }
}`

export default function JobOpenings() {
  const { data } = useQuery(GET_FORM_DETAIL, {
    variables: {
      id: "Im7_eAG82jwvy1-CZROik"
    }
  })

  const fields = data?.formDetail?.fields || [];

  const initialFormData = fields.reduce((acc: any, field: any) => {
    acc[field._id] = "";
    return acc;
  }, {});

  const [formData, setFormData] = useState<any>(initialFormData);
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [saveLead, { loading }] = useMutation(WIDGETS_SAVE_LEAD)

  React.useEffect(() => {
    setFormData(fields.reduce((acc: any, field: any) => {
      acc[field._id] = "";
      return acc;
    }, {}));
  }, [fields.length]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setNotification("Мэдээллийг бүрэн оруулна уу!")
      return
    }
    try {
      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
      }
      const getFieldId = (type: string) => {
        const field = fields.find((f: any) => f.type === type)
        return field?._id || type
      }
      const submissions = [
        { _id: getFieldId("text"), type: "text", text: "Таны нэр:", value: formData.name },
        { _id: getFieldId("email"), type: "email", text: "Таны и-мэйл хаяг", value: formData.email },
        { _id: getFieldId("phone"), type: "phone", text: "Таны утасны дугаар", value: formData.phone },
        { _id: getFieldId("text2"), type: "text", text: "Таны хүсэлт", value: formData.message },
      ]
      await saveLead({
        variables: {
          formId: data.formDetail._id,
          submissions,
          browserInfo,
          cachedCustomerId: "-5wwdBJSWeBaOrgvEmXDW",
        },
      })
      setShowSuccessModal(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
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
          <h1 className='mb-4 text-4xl font-bold text-gray-800'>Ажлын анкет</h1>
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
                      <User className='h-4 w-4' />
                      Таны нэр:
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

                  <div className='flex gap-4'>
                    <div className='space-y-2 w-1/2'>
                      <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                        <Mail className='h-4 w-4' />
                        Таны и-мэйл хаяг
                      </label>
                      <input
                        type='text'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Таны и-мэйл хаяг'
                        className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                      />
                    </div>

                    <div className='space-y-2 w-1/2'>
                      <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                        <Phone className='h-4 w-4' />
                        Таны утасны дугаар
                      </label>
                      <input
                        type='text'
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Таны утасны дугаар'
                        className='w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                      <MessageCircle className='h-4 w-4' />
                      Таны хүсэлт
                    </label>
                    <textarea
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder='Таны хүсэлт'
                      rows={4}
                      className='w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#113f52] focus:ring-4 focus:ring-[#113f52]/10 hover:border-gray-300'
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-6 pt-4 border-t border-gray-200'>
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
                Хүсэлт гаргасанд баярлалаа. Бид таны хүсэлтийг хүлээн авсан
                бөгөөд хянан үзэх болно. Таньд удахгүй имэйлээр хариу илгээх
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
