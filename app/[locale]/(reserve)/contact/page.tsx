"use client"

import { useState } from "react"
import { Phone, MapPin, Mail, MessageCircle, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCmsPosts } from "@/sdk/queries/cms"
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

export default function ContactComponent() {
  const { posts, loading: postsLoading } = useCmsPosts({
    tagIds: ["P_ga05OkoXh2uQDdlCwho"],
  })

  const post = posts[0]

  const [formData, setFormData] = useState({
    name: "",
    ovog: "",
    email: "",
    phone: "",
    message: "",
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const [saveLead, { loading: submitLoading }] = useMutation(WIDGETS_SAVE_LEAD)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.ovog ||
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
      const submissions = [
        { _id: "name", type: "text", value: String(formData.name) },
        { _id: "ovog", type: "text", value: String(formData.ovog) },
        {
          _id: "email",
          type: "text",
          value: String(formData.email),
        },
        { _id: "phone", type: "text", value: String(formData.phone) },
        { _id: "message", type: "text", value: String(formData.message) },
      ]
      await saveLead({
        variables: {
          formId: "WNx4z1Cr-Gt6tyEKn4fzB",
          submissions,
          browserInfo,
          cachedCustomerId: "-5wwdBJSWeBaOrgvEmXDW",
        },
      })
      setShowSuccessModal(true)
      setFormData({
        name: "",
        ovog: "",
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
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b'>
        <div className='container mx-auto px-6 py-12'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              {post?.title}
            </h1>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              {post?.excerpt}
            </p>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-16'>
        <div className='grid lg:grid-cols-2 gap-12'>
          <div className='space-y-8'>
            <div>
              <h2 className='text-2xl font-semibold text-gray-900 mb-6'>
                {post?.title}
              </h2>
              <div className='space-y-6'>
                <Card className='p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                      <Phone className='w-6 h-6 text-gray-600' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>Утас</h3>
                      <a
                        href='tel:+97688010003'
                        className='text-gray-600 hover:text-gray-700 font-medium'
                      >
                        +976 88010003, 86010003
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className='p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                      <MapPin className='w-6 h-6 text-gray-600' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>Байршил</h3>
                      <p className='text-gray-600'>
                        Горхи тэрэлжийн байгалийн үзэсгэлэнт газар,
                        <br />
                        Улаанбаатараас 49км-т байршилтай
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className='p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                      <Mail className='w-6 h-6 text-gray-600' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900'>И-мэйл</h3>
                      <a
                        href='mailto:ekh.terelj@gmail.com'
                        className='text-gray-600 hover:text-gray-700 font-medium'
                      >
                        ekh.terelj@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Card className='overflow-hidden bg-white shadow-sm border border-gray-200'>
              <div className='h-[300px]'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2677.5520482391134!2d107.40107967680291!3d47.84827087125747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d94255801871fe5%3A0xb6d2b3a83c270feb!2sEkh%20terelj%20resort!5e0!3m2!1smn!2smn!4v1746674109557!5m2!1smn!2smn'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen
                  loading='lazy'
                ></iframe>
              </div>
            </Card>
          </div>

          <div>
            <Card className='p-8 bg-white shadow-sm border border-gray-200'>
              <div className='mb-6'>
                <h2 className='text-2xl font-semibold text-gray-900 mb-2 flex items-center'>
                  <MessageCircle className='w-6 h-6 mr-2 text-[#113f52]' />
                  Бидэнд мессеж илгээх
                </h2>
                <p className='text-gray-600'>
                  Бид таны санал бодлыг сонсохыг хүсч байна. Бидэнд мессеж
                  илгээвэл аль болох хурдан хариулах болно.
                </p>
              </div>

              <form className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Нэр
                    </label>
                    <Input
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder='Таны нэр'
                      className='border-gray-300 focus:border-[#113f52] focus:ring-[#113f52]'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Овог
                    </label>
                    <Input
                      name='ovog'
                      value={formData.ovog}
                      onChange={handleInputChange}
                      placeholder='Таны овог'
                      className='border-gray-300 focus:border-[#113f52] focus:ring-[#113f52]'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    И-мэйл хаяг
                  </label>
                  <Input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='example@gmail.com'
                    className='border-gray-300 focus:border-[#113f52] focus:ring-[#113f52]'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Утасны дугаар (заавал биш)
                  </label>
                  <Input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder='+976 99119911'
                    className='border-gray-300 focus:border-[#113f52] focus:ring-[#113f52]'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Мессеж
                  </label>
                  <Textarea
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder='Нэмэлт мэдээлэл...'
                    rows={5}
                    className='border-gray-300 focus:border-[#113f52] focus:ring-[#113f52]'
                  />
                </div>

                <Button
                  type='button'
                  onClick={handleSubmit}
                  disabled={submitLoading}
                  className='w-full bg-[#113f52] hover:bg-[#113f52]/80 text-white font-medium py-3'
                >
                  {submitLoading ? "Илгээж байна..." : "Илгээх"}
                </Button>
              </form>
            </Card>

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
                    Хүсэлт илгээсэн. Бид таны хүсэлтийг хүлээн авсан бөгөөд
                    хянан үзэх болно. Таньд удахгүй имэйлээр хариу илгээх болно.
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
      </div>
    </div>
  )
}
