"use client";
import { phoneZod } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormLabel,
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import PersonalInfoPart from "./personal-info-part/personal-info-part";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import PaymentPart from "./payment-part/payment-part";
import ExtraServices from "./extra-services/extra-services";
import { BookingFormT, ExtraT } from "@/lib/schema/types";
import { formatToDate, parseDate } from "@/lib/date";
import { addDays, formatDistance } from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import {
  dealIdAtom,
  reserveCompletedAtom,
  reserveCountAtom,
  reserveDateAtom,
  reserveExtrasAtom,
  reserveUserAtom,
  selectedRoomAtom,
  selectedRoomsAtom,
} from "@/store/reserve";
import { useCreateEditDeal, useStages } from "@/sdk/queries/sales";
import { MutationHookOptions, useMutation, useQuery } from "@apollo/client";
import { mutations } from "@/sdk/graphql/sales";
import { IStage } from "@/types/sales";
import useCreateCustomer from "@/sdk/mutations/customers";
import { useEffect, useState } from "react";
import useCustomers from "@/sdk/queries/customers";
import { useRouter } from "@/i18n/routing";
import { queries } from "@/sdk/graphql/payments";
import { queries as salesQueries } from "@/sdk/graphql/sales";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/sdk/queries/auth";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { currentUserAtom } from "@/store/auth";
import { IProduct } from "@/types/products";
import QpayPayment from "./qpay-payment/qpay-payment";
import CheckBookingDetail from "./check-booking-detail/check-booking-detail";

export const termsContent = `              
                  Introduction and Scope of Services Updated: December 15th,
                  2021 TourRadar GmbH, based in Vienna, Austria ("TourRadar"),
                  operates a website under www.tourradar.com (including its
                  social media channels and mobile applications, jointly the
                  “Platform”) where travel operators (“Operators”) can offer,
                  promote, market and sell package tours within the meaning of
                  Directive (EU) 2015/2302 to users and registered users of the
                  Platform (the “Traveler” or “you”). Travelers can also use the
                  Platform to evaluate and compare Operators and their tours,
                  participate in competitions, write reviews and enjoy other
                  related offers (together “TourRadar Services”). These terms
                  and conditions apply to all TourRadar Services and govern the
                  rights and obligations arising out of the Traveler’s use of
                  the Platform. If you have your place of residence or business
                  in the European Economic Area (“EEA”) or the United Kingdom,
                  your use of the Platform is subject to these Terms of Use for
                  European Users. For Travelers with a place of residence or
                  business in Australia, the use of the Platform is subject to
                  the Australian Terms of Use. For Travelers with a place of
                  residence or business in Canada, the use of the Platform is
                  subject to the Canadian Terms of Use. For Travelers with a
                  place of residence or business in all other jurisdictions, the
                  license agreement with TourRadar is subject to the US Terms of
                  Use. By accessing, browsing or using the Platform, you agree
                  to be bound by these terms and conditions. Please read these
                  terms and conditions and our privacy policy carefully. A)
                  Terms of Use of the Platform TourRadar operates the Platform
                  on which Operators can offer and market travel services such
                  as multi day tours, cruises, adventure trips, luxury travels
                  and other travel activities (individually or jointly “Travel
                  Adventures”) The TourRadar Services are solely for persons who
                  are aged 18 years or older. Any access to or use of the
                  Platform by anyone under 18 years is expressly prohibited. By
                  accessing or using the Services and the Platform you guarantee
                  that you are 18 years or older. If you are acting on behalf of
                  a company or another legal entity you guarantee that you are
                  legally entitled to accept these terms and conditions in their
                  name. Prohibited Conduct TourRadar Services are only available
                  for private, non-commercial use. It is not allowed to sell,
                  re-sell, re-use or commercially use content, information,
                  software, products or services available on our Platform.
                  Further, it is prohibited to: Use bots, crawlers, scrapers or
                  other automated means (besides authorized use of our API) to
                  access or interact with the Platform or generally collect data
                  or content not in connection with your booking. Circumvent
                  established security or technological barriers in place to
                  protect the Platform and it’s content. Decrypt, decompile,
                  reverse engineer or copy the website and Platform. Otherwise
                  compromise or damage the Platform and its proper functioning.
                  Content and Intellectual Property TourRadar may, in its sole
                  discretion, permit you to post, upload, publish, submit or
                  transmit text, graphics, images, video or other materials
                  (“Content”) on the Platform and through the TourRadar
                  Services. By making available any Content, you agree that
                  TourRadar may use the Content on the Platform, in particular
                  for promotional materials and publications. You hereby grant
                  to TourRadar a worldwide, irrevocable, perpetual,
                  non-exclusive, royalty-free license to publicly display or
                  otherwise use the Content for the aforementioned purpose.
                  TourRadar does not claim any ownership rights in any such
                  Content and nothing in these Terms will be deemed to restrict
                  any rights that you may have to use and exploit the Content.
                  You acknowledge and agree that you are solely responsible for
                  all Content that you make available on the Platform or through
                  the TourRadar Services. Accordingly, you represent and warrant
                  that: (a) you either are the sole and exclusive owner of all
                  Content or you have all rights, licenses, consents and
                  releases that are necessary to grant to TourRadar the rights
                  in such Content, as contemplated under these terms and
                  conditions; and (b) neither the Content nor your posting,
                  uploading, publication, submission or transmittal of the
                  Content or TourRadar's use of the Content (or any portion
                  thereof) on, through or by means of the Services will
                  infringe, misappropriate or violate a third party's patent,
                  copyright, trademark, trade secret, moral rights or other
                  proprietary or intellectual property rights, or rights of
                  publicity or privacy, or result in the violation of any
                  applicable law or regulation. It is not allowed to upload or
                  submit Content that (i) is illegal, pornographic, incites
                  hate, obscene or defamatory; (ii) contains commercial content,
                  especially advertisement or marketing for other good or
                  services (iii) infringes intellectual property rights of
                  others (iv) contains viruses, malware, trojan horses or other
                  infested files.TourRadar is not obliged to check any Content
                  ex-ante. Content that violates this clause can be blocked or
                  removed immediately without notice. Termination TourRadar and
                  registered users can terminate the usage contract anytime with
                  immediate effect. Please send an email to
                  privacy@tourradar.com and we will delete your account. In case
                  of a termination TourRadar is not obliged to delete or revert
                  any content posted by the Traveler on the Platform. Rights and
                  obligations of existing Travel Adventures are not affected by
                  such a termination. B) Terms for Travel Adventures - The Role
                  of TourRadar The combination of travel services offered to you
                  are packages within the meaning of Directive (EU) 2015/2302.
                  Therefore, you will benefit from all EU rights applying to
                  packages. The Operator will be fully responsible for the
                  proper performance of the package as a whole. Additionally, as
                  required by law, the Operator has to have protection in place
                  to refund your payments and, where transport is included in
                  the package, to ensure your repatriation in the event that it
                  becomes insolvent. More information on key rights under
                  Directive (EU) 2015/2302 here. The Travel Adventures are
                  independently created, offered and carried out by the
                  Operators at their own discretion and responsibility.
                  TourRadar is solely acting as a commercial agent for the
                  Operators. TourRadar is not an Operator, nor a provider of
                  Travel Adventures, nor a representative or proxy of an
                  Operator nor an insurer. TourRadar does not own, sell, resell,
                  furnish, provide, manage or control any transportation, tour
                  or travel services and does not act as an agent to the
                  Travelers. TourRadar has no control over the behavior of
                  Operators, Travelers and other users of the platform. It is
                  the responsibility of the traveler to be in possession of a
                  valid travel identification along with any necessary visa at
                  the time of the travel. The Traveler is also responsible for
                  compliance with applicable health requirements and recommended
                  or obligatory vaccinations. Conclusion of a Contract,
                  Documents & Information Travel Adventures are booked directly
                  with the respective Operator. The current Operators terms and
                  conditions apply. By clicking on “Book now” you are submitting
                  a binding offer for the selected Travel Adventure to the
                  respective Operator. The Travel Adventure contract is
                  concluded by the Operator accepting your offer (“Booking”). In
                  this case the contract is concluded directly between the
                  Traveler and the Operator. The contract text and your booking
                  data are saved by TourRadar to process the contractual
                  relationship. The Operators will confirm or reject a booking
                  request within 24 to 72 hours during which time your offer is
                  binding. As soon as the booking transaction is completed
                  (including successful (down) payment), the Traveler receives a
                  booking confirmation via email with a summary of the contract.
                  Booking on request: In certain circumstances you are informed
                  that a booking is “on request” (which is usually the case with
                  Travel Adventures booked shortly before the start of the
                  trip). In this case the Operator needs up to 5 Business days
                  to ensure that all components of the Travel Adventure can be
                  confirmed. In case of such a Booking on request the Traveler
                  is bound to his offer until the Operator either accepts or
                  rejects the booking. The Operators’ cancellation and payment
                  terms apply from the moment of your request. If the request is
                  accepted, you will be billed for the full amount. If the
                  Operator cannot confirm your request, you will receive a full
                  refund of any amounts already paid. Special requests by the
                  Traveler are non-binding, as long as they have not been
                  confirmed by the Operator. TourRadar will forward special
                  requests and inquiries of the Traveler to the Operator. A
                  binding performance commitment however is only available upon
                  confirmation by the respective Operator. Your Responsibilities
                  When using the TourRadar Services, you undertake to provide
                  all required personal information in a timely, complete and
                  truthful manner. In particular, you will provide upfront
                  information on all circumstances and restrictions affecting
                  the performance of the services by TourRadar and the Operator
                  (e.g. special needs such as food intolerance, restricted
                  mobility or state of health). Travelers who make a booking for
                  themselves or on behalf of third parties (such as fellow
                  travelers) through the Platform are deemed to be the client
                  and, in the absence of any other declaration, accept the
                  obligations arising out of their use of the Platform under
                  these terms and conditions. By using the TourRadar Services
                  for himself or others, the Traveler agrees to inform those
                  others of these terms and conditions. The Traveler accepts
                  that he is responsible for all bookings and travel
                  reservations made by anyone under his control. The Traveler
                  guarantees that all information that he provides directly or
                  indirectly through third parties is true, complete and
                  accurate and that the Traveler is not an unaccompanied minor.
                  Any exploratory, manipulative, speculative, false or
                  fraudulent booking (inquiry) is prohibited without
                  restriction. The Traveler undertakes to check all contractual
                  documents transmitted by means of the TourRadar Services (e.g.
                  travel contract, booking confirmation, vouchers) for factual
                  correctness and completeness (spelling mistakes, e.g. name,
                  date of birth, special travel requirements) and to report any
                  recognizable errors or defects in the activity of TourRadar
                  immediately. Travelers with restricted mobility, pregnant
                  Travelers and Travelers who require special medical care must
                  inform TourRadar of their special needs at least 48 hours
                  before the start of the journey. Travelers must immediately
                  report any perceived breach of contract, so that the
                  respective Operator can be put in a position to quickly remedy
                  any non-conformity which can be addressed with reasonable
                  effort. The Traveler is advised to file any complaints in
                  writing using the TourRadar Services and in particular the
                  Booking Management Page. If the Traveler fails to report a
                  lack of conformity, it can be prejudicial to the Traveler. The
                  mere report of a lack of conformity alone does not trigger any
                  legal obligations on the side of TourRadar or the Operator.
                  The Traveler is obliged to pay the contractually agreed fees
                  in due time and will indemnify and hold TourRadar harmless for
                  any damage caused by delay. The Traveler must inform TourRadar
                  without delay in the event that he receives payments arising
                  from claims for damages or price reduction due to breach of
                  contract. Payments and Fees If applicable and available,
                  certain Operators offer the opportunity for Bookings to be
                  paid (wholly or partly and as required under the payment
                  policy of the Operator) to the Operator during the Booking
                  process by means of secure online payment (all to the extent
                  offered and supported by your bank). For certain products and
                  services, TourRadar facilitates (through third party payment
                  processors) the payment of the relevant product or service
                  (i.e. the payment facilitation service) for and on behalf of
                  the Operator (TourRadar never acts nor operates as the
                  merchant of record). Payment is safely processed from your
                  credit/debit card or bank account to the bank account of the
                  Operator through a third party payment processor. Any payment
                  facilitated by us for and on behalf of, and transferred to the
                  Operator will in each case constitute a payment of (part of)
                  the booking price by you of the relevant product or service in
                  final settlement of such (partial) due and payable price and
                  you cannot reclaim such paid monies. TourRadar reserves the
                  right to offer to the Traveler particularly advantageous
                  payment options (e.g. installment payment models) itself or
                  through a payment service provider. If you accept, you agree
                  to be bound by the terms and conditions specified and
                  communicated by TourRadar or the payment service provider.
                  TourRadar may charge fees (and applicable Taxes) for the right
                  to use the Platform. Any applicable fees are disclosed to you
                  before making a Booking. Except as otherwise provided on the
                  Platform, service fees form part of final price and follow the
                  rules of each Booking in respect to cancellations and refunds.
                  TourRadar reserves the right to change the service fees at any
                  time. Fee changes will not affect prior made Bookings Trip
                  cancellations and refunds If the Operator does not confirm the
                  requested Booking or if an Operator cancels an existing
                  Booking, all authorizations made on the Traveler's (credit)
                  card will be automatically released and/or all amounts
                  collected through another payment method will be refunded to
                  the Traveler within 14 days. As soon as the Operator confirms
                  a Booking, the Operator’s cancellation and payment conditions
                  apply. Please read the important information on the Booking
                  Detail Page, Booking Management Page and in your booking
                  confirmation regarding the Operator's terms and conditions
                  carefully. Any cancellation must be made through the TourRadar
                  Services (booking management page). Complaints and claims from
                  the Traveler in relationship to Travel Adventures will be
                  handled by the Operators via the TourRadar Services. Important
                  information on insurance for package travel When booking
                  Travel Adventures well in advance, unforeseeable things can
                  happen. TourRadar recommends that all Travelers conclude the
                  following insurance policies which are not part of any Travel
                  Adventure: Travel cancellation insurance in order to minimize
                  financial risk in case of cancellation by the Traveler before
                  departure. Travel interruption insurance in order to minimize
                  financial risk in case of a travel interruption by the
                  Traveler after departure Adequate health insurance C)
                  TourRadar Reward Programs Referral Program The following
                  restrictions apply: Members of TourRadar’s affiliate program
                  may not simultaneously collect travel credits via their invite
                  link. To accumulate and redeem travel credits you must
                  maintain a TourRadar account in good standing. Violations of
                  these terms and conditions may also lead to forfeiture of the
                  credits in your account. TourRadar reserves the right to
                  cancel, revoke, or otherwise prevent the issuance of travel
                  credits in any suspected case of fraudulence or misuse of this
                  program and does not need to provide any details or
                  explanation. TourRadar reserves the right to modify or
                  discontinue the referral program either temporarily or
                  permanently (or any part thereof) at any time. TourRadar is
                  not liable to you in the event of any modification, suspension
                  or discontinuance of this program. Travel credits are not
                  redeemable for cash or equivalents. TourRadar's promo codes
                  and travel credits cannot be applied on existing confirmed
                  bookings. Loyalty Program TourRadar's Loyalty Program allows
                  you as a traveler to earn TourRadar travel credits (“Travel
                  Credits”) after every booking with a Gross Booking Value of at
                  least ($1000/£1000/€1000/₹87000) made on TourRadar. Gross
                  Booking Value (“GBV”) means the total value of a completed
                  booking as advised by the operator for the tour net of any
                  discounts and promotions. The GBV does not include airfare,
                  insurance, pre & post accommodations, extra transfers, extras
                  & addons, discounted or familiarization staff travel and
                  anything else similar in nature. Cancellations and refunds are
                  also not included and will reduce the GBV. Depending on the
                  GBV, you will receive Travel Credits in the following amounts:
                  Bookings up to a GBV of USD5,000 (AUD5000,£5000, ₹400000,
                  €5000) , earn USD50 (AUD50,£50, ₹3500, €50) in Travel Credits.
                  Bookings with a GBV from USD 5001 - USD 10,000 (AUD 5001 -
                  AUD10000 ,£5001 - £10000, ₹375001 - ₹750,000, €5001 - €10000)
                  , earn $150 ($150,£150, ₹12,000, €150) in Travel Credits.
                  Bookings with a GBV over USD10,000 (AUD10000,£10000, ₹750,000,
                  €10000) , earn USD 250 ( AUD 250,£250, ₹18,500, €250) in
                  Travel Credits. Travel Credits will be deposited into your
                  account after the respective Travel Adventure and may only be
                  used as a discount for future Travel Adventure bookings.
                  Travel Credit Spending A Traveller can only pay for 5% of the
                  GBV of any Travel Adventure using Travel Credits. If a
                  Traveller has more Travel Credits than the capped allowance
                  the remainder of the Travel Credits will remain in the
                  Travellers account and can be used for additional bookings.
                  DIscretional Travel Credits TourRadar may in its sole
                  discretion provide Travel Credits. These Travel Credits can be
                  used on the same basis as outlined above for the TourRadar
                  Referral and TourRadar Loyalty programs. Discretional Promo
                  Codes TourRadar may in its sole discretion offer promo codes
                  from time to time. Unless otherwise stated they have an expiry
                  period of 30 days from implementation of the offer. Promo
                  codes can only be used for bookings on the same basis as
                  outlined above for the TourRadar Referral and TourRadar
                  Loyalty programs. Only one promo code can be redeemed per
                  booking and they can not be combined with Travel Credits. D)
                  General Provisions Liability TourRadar is not liable for
                  slight negligence. This limitation of liability shall not
                  apply in case of fraudulent intent, in case of bodily injury
                  or personal damage, for the breach of guarantees and for
                  claims arising from product liability. TourRadar is not liable
                  for acts of force majeure (Cyber Crime, earthquakes,
                  pandemics, floodings, etc). TourRadar as an intermediary is
                  particularly not liable for: the Operator’s performance under
                  the Travel Adventure contract; for the provision of a service
                  that is outside of the scope of the booked Travel Adventure;
                  for additional services booked by the Traveler on his own risk
                  and account after departure. TourRadar is not liable for
                  booking errors (e.g. typographical errors) that are caused by
                  the Traveler or that are caused by unavoidable and
                  extraordinary circumstances. Electronic correspondence The
                  delivery address for notifications and all official
                  correspondence from TourRadar to you is the contact
                  information (E-mail address) you have last entered into your
                  TourRadar account details. You are obliged to update any
                  changes without delay. Contact and Complaints The Traveler can
                  also send messages, requests and complaints in regards to the
                  performance of a Travel Adventure to TourRadar as the
                  retailer. TourRadar will forward those messages, requests and
                  complaints without delay to the Operator. For the purpose of
                  deadlines any message delivered to TourRadar shall be deemed
                  as duly delivered to the Operator. TourRadar advises you to
                  first notify TourRadar of any complaints by contacting
                  TourRadar’s Customer Support team by using your TourRadar
                  Booking Conversation page and clicking the ‘notify us’ link.
                  If this does not resolve your complaint, you can upload your
                  complaint via the European Commission's ODR platform. This
                  platform for online dispute resolution can be found here:
                  https://ec.europa.eu/odr. Privacy The data protection
                  regulations of TourRadar apply. Information and notes on the
                  collection and use of your personal data by TourRadar can be
                  found here. Applicable law, place of jurisdiction and dispute
                  resolution These terms and conditions and the provision of the
                  TourRadar Services shall be governed by and construed in
                  accordance with Austrian law with the exclusion of its
                  conflict-of-law rules. The statutory provisions on the
                  restriction of the choice of law and the applicability of
                  mandatory provisions, in particular of the state in which the
                  Traveler as a consumer has his habitual residence, remain
                  unaffected. Any dispute arising out of these terms and
                  conditions and the TourRadar Services shall exclusively be
                  submitted to the competent courts in Vienna, 1010, Austria.
                  Notwithstanding the foregoing jurisdiction clause, a Traveler
                  as a consumer may also bring proceedings in the courts of the
                  country in which he is domiciled, and proceedings against a
                  Traveler as a consumer may be brought only in the courts of
                  the country in which he is domiciled.
                `;

const FormSchema = z.object({
  forWho: z.string(),
  firstname: z.string().min(1, { message: "Firstname" }),
  lastname: z.string().min(1, { message: "Lastname" }),
  mail: z.string().email(),
  phone: phoneZod,
  description: z.string().max(250).optional(),
  guestFirstname: z.string().optional(),
  guestLastname: z.string().optional(),
  guestMail: z.string().email().optional(),
});

const CheckoutForm = () => {
  const router = useRouter();
  const [selectedRoom] = useAtom(selectedRoomAtom);
  const [date] = useAtom(reserveDateAtom);
  const [selectedRooms] = useAtom(selectedRoomsAtom);
  const [reserveCount] = useAtom(reserveCountAtom);
  const [reserveUser, setReserveUser] = useAtom(reserveUserAtom);
  const [reserveExtras, setReserveExtras] = useAtom(reserveExtrasAtom);
  const [reserveCompleted, setReserveCompleted] = useAtom(reserveCompletedAtom);
  const [dealId, setDealId] = useAtom(dealIdAtom);
  const [customerId, setCustomerId] = useState();
  const [isMyself, setIsMyself] = useState(true);
  const [terms, setTerms] = useState(true); //must be false
  const [confirmBookingView, setConfirmBookingView] = useState("confirm");
  const { firstName, lastName, email, phone } =
    useAtomValue(currentUserAtom) || {};
  const { loading: currentUserLoading, currentUser } = useCurrentUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      forWho: "myself",
      firstname: firstName,
      lastname: lastName,
      mail: email,
      phone: phone,
      description: reserveUser.description,
    },
  });

  const [addDeal, { loading }] = useMutation(mutations.dealsAdd);
  // const [editDeal] = useMutation(mutations.dealsEdit, {
  //   variables: { id: dealId },
  // });
  // const { data: currentDeal } = useQuery(salesQueries.dealDetail, {
  //   variables: { id: dealId },
  // });
  const { data } = useQuery(queries.payments);
  const { stages, loading: stagesLoading } = useStages();
  const { createCustomer, error } = useCreateCustomer();
  // const { getCustomers, customers } = useCustomers();

  const nights = parseInt(date?.from && formatDistance(date?.from, date?.to));

  const selectedRoomsByMutation = selectedRooms.map(({ room }) => ({
    productId: room?._id,
    startDate: date?.from,
    endDate: date?.to,
    unitPrice: room?.unitPrice,
    quantity: nights,
    amount: room?.unitPrice * nights,
    uom: room?.uom,
    tickUsed: true,
    information: {
      adults: reserveCount?.adults,
      children: reserveCount?.children,
    },
  }));

  const selectedExtrasByMutation = selectedRooms.flatMap(({ extras, room }) =>
    extras?.map((extra) => ({
      productId: extra?._id,
      quantity: 1,
      name: extra?.name,
      unitPrice: extra?.unitPrice,
      amount: extra?.unitPrice * 1,
      information: {
        parentId: selectedRoom?._id,
      },
    }))
  );

  useEffect(() => {
    if (confirmBookingView === "confirmed") {
      router.push("/booking/confirmation");
    }
  }, [confirmBookingView]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setReserveUser(data);
    setReserveCompleted(!reserveCompleted);

    const variables = {
      name: `${data.firstname} ${data.lastname}`,
      customerIds: [currentUser?.erxesCustomerId],
      productsData: [...selectedRoomsByMutation, ...selectedExtrasByMutation],
      stageId: stages?.find((st: IStage) => st.code === "unconfirmed")?._id,
      startDate: date?.from,
      closeDate: date?.to,
      description: data.description,
    };

    // if (!currentDeal?.dealDetail) {
    // addDeal({
    //   variables,
    //   onCompleted: (deal) => {
    //     setReserveCompleted(true);
    //     // setDealId(deal?.dealsAdd?._id);
    //     router.push(`/profile/orders/${deal.dealsAdd?._id}`);
    //   },
    // });
    // }
    // else {
    //   editDeal({
    //     variables,
    //     onCompleted: () => {
    //       setReserveCompleted(true);
    //       router.push(`/profile/orders/${dealId}`);
    //     },
    //   });
    // }
  }
  const titles = [
    {
      title: "Your personal information",
      content: (
        <div className="p-6 border rounded-lg space-y-10 shadow-sm">
          <FormField
            control={form.control}
            name="forWho"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    onChange={() => setIsMyself(!isMyself)}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="myself" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Booking for myself
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="someone" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Booking on behalf of someone else
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <PersonalInfoPart form={form} />
          {!isMyself && (
            <div className="space-y-6">
              <h1>Please enter the details of the travelling guest below</h1>
              <div className="grid grid-cols-6 gap-6 px-1 mb-3">
                <FormField
                  control={form.control}
                  name="guestFirstname"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel className="text-textxs">
                        Guest's first name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter guest's first name"
                          {...field}
                          className="text-textsm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guestLastname"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormLabel className="text-textxs">
                        Guest's last name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter guest's last name"
                          {...field}
                          className="text-textsm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="px-1 space-y-3">
                <FormField
                  control={form.control}
                  name="guestMail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-textxs">
                        Guest's e-mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter guest's email"
                          {...field}
                          className="text-textsm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Additional Comments",
      content: (
        <div className="border rounded-lg p-6 shadow-sm">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-textsm">
                  Special requests (optional){" "}
                  {!!field.value?.length && (
                    <span className="text-[10px] leading-2 text-black/60">
                      {field.value?.length}/250
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Limit 250 characters"
                    {...field}
                    className="text-textsm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ),
    },
    {
      title: "Payment",
      content: <PaymentPart paymentsData={data?.payments} />,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-1 space-y-6">
        <h1 className="text-displayxs">Check-in guest information</h1>
        <Accordion
          type={"multiple"}
          className="w-full"
          defaultValue={["item-0"]}
        >
          {titles.map((title, index) => {
            return (
              <AccordionItem
                value={`item-${index}`}
                className="border-none"
                key={index}
              >
                <AccordionTrigger className="text-textlg md:text-textxl">
                  {title.title}
                </AccordionTrigger>
                {!currentUserLoading && (
                  <AccordionContent>{title.content}</AccordionContent>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>

        <Separator />

        <div className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-black text-textxl">Cancellation policy</h2>
            <ul className="list-disc pl-7 text-black/70 text-textsm">
              <li>
                This rate is non-refundable. If you change or cancel your
                booking you will not get a refund or credit to use for a future
                stay. This policy will apply regardless of COVID-19, subject to
                any local consumer laws.
              </li>
              <li>
                No refunds will be issued for late check-in or early check-out.
              </li>
              <li>Stay extensions require a new reservation.</li>
            </ul>
          </div>

          <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
              <div className="flex gap-2 cursor-pointer">
                <Checkbox id="terms" checked={terms} />
                <div className="grid gap-1.5 leading-none cursor-pointer">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[60vh] max-h-[50vh] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>Terms and Conditions</DialogTitle>
              </DialogHeader>

              <div className="text-textsm">{termsContent}</div>

              <Separator />

              <div className="flex items-center gap-2 text-textsm cursor-pointer">
                <Checkbox
                  id="terms"
                  checked={terms}
                  onCheckedChange={(checked: any) => setTerms(checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  onClick={() => setTerms(!terms)}
                >
                  I have read and accept the terms and conditions
                </label>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button size={"lg"} className="w-full" type="submit" disabled={!terms}>
          Confirm Booking
        </Button>
        <Dialog
          onOpenChange={setReserveCompleted}
          // open={reserveCompleted ? true : false}
          defaultOpen
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Check your booking</DialogTitle>
            </DialogHeader>
            <Separator />
            {confirmBookingView === "confirm" ? (
              <CheckBookingDetail />
            ) : confirmBookingView === "payment" ? (
              <QpayPayment />
            ) : (
              <div>Your booking confirmed.</div>
            )}

            
            {confirmBookingView === "confirm" ? (
              <Button onClick={() => setConfirmBookingView("payment")}>
                Confirm my booking
              </Button>
            ) : confirmBookingView === "payment" ? (
              <Button onClick={() => setConfirmBookingView("confirmed")}>
                Check payment
              </Button>
            ) : (
              <Button>Close</Button>
            )}
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};
export default CheckoutForm;
