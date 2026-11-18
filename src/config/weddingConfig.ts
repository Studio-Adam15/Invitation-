export type Language = 'ar' | 'en';

export interface VenueConfig {
  isAnnounced: boolean;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  eventTimeAr: string;
  eventTimeEn: string;
  googleMapsUrl: string;
}

export interface RsvpIntegrationConfig {
  /**
   * 'unconfigured': Validates and previews the formatted response locally without
   * claiming it was saved to a backend database.
   * 'whatsapp': Opens WhatsApp with the formatted message to `whatsappNumber`.
   * 'webhook': POSTs JSON payload to `webhookUrl`.
   */
  mode: 'unconfigured' | 'whatsapp' | 'webhook';
  whatsappNumber: string;
  webhookUrl: string;
}

export const WEDDING_TIMEZONE = 'Asia/Amman';
// Jordan permanently observes UTC+03:00 (Asia/Amman)
export const WEDDING_TARGET_ISO = '2026-12-20T19:00:00+03:00';

export const WEDDING_VENUE_CONFIG: VenueConfig = {
  isAnnounced: false,
  nameAr: '',
  nameEn: '',
  addressAr: '',
  addressEn: '',
  eventTimeAr: '',
  eventTimeEn: '',
  googleMapsUrl: '',
};

export const RSVP_CONFIG: RsvpIntegrationConfig = {
  mode: 'unconfigured',
  whatsappNumber: '',
  webhookUrl: '',
};

export const COPY = {
  ar: {
    langToggle: 'EN',
    langAria: 'Switch to English',
    envelopeTitle: 'دعوة زفاف',
    monogramLeft: 'A',
    monogramRight: 'L',
    sealHint: 'المسوا الختم لفتح الدعوة',
    musicOn: 'إيقاف الموسيقى',
    musicOff: 'تشغيل الموسيقى',
    musicShort: 'الموسيقى',
    replayEnvelope: 'إعادة تجربة الدعوة',
    bismillah: 'بسم الله الرحمن الرحيم',
    introLine: 'بكل الحب والفرح، نتشرف بدعوتكم لمشاركتنا أجمل لحظات العمر.',
    groomLabel: 'العريس',
    groomName: 'أيوب استيتية',
    brideLabel: 'العروس',
    brideName: 'ليندا سالم',
    secondaryEnglishIntro: 'Together with their families,',
    secondaryEnglishNames: 'Ayoub Istaiteh & Linda Salem',
    secondaryEnglishClosing:
      'Request the pleasure of your company as they celebrate their wedding day.',
    closingLine: 'نتمنى أن تشاركونا فرحتنا ونحتفل معاً ببداية حكاية جديدة.',
    dateEyebrow: 'موعد الزفاف',
    dateHeadlineEn: '20 DECEMBER 2026',
    dateFull: 'الأحد، 20 ديسمبر 2026',
    timezoneNote: 'بتوقيت الأردن (عمّان)',
    calendarMonth: 'ديسمبر ٢٠٢٦',
    countdown: {
      eyebrow: 'العد التنازلي للفرح',
      days: 'أيام',
      hours: 'ساعات',
      minutes: 'دقائق',
      seconds: 'ثواني',
      arrived: 'حلّ يوم الفرح!',
    },
    venue: {
      eyebrow: 'مكان الحفل',
      title: 'تفاصيل الموقع',
      tbaPrimary: 'سيتم الإعلان عن موقع الحفل قريباً.',
      tbaSecondary: 'Venue details will be announced soon.',
      tbaNote: 'سيتم إضافة اسم القاعة والعنوان ورابط الاتجاهات عبر خرائط جوجل فور تحديدها.',
      nameLabel: 'القاعة / الموقع',
      timeLabel: 'الوقت',
      addressLabel: 'العنوان',
      openMap: 'الحصول على الاتجاهات',
    },
    rsvp: {
      eyebrow: 'تأكيد الحضور',
      title: 'يسعدنا حضوركم',
      subtitle: 'يرجى تأكيد حضوركم لمشاركتنا هذه الليلة المميزة.',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'أدخل اسمك الكريم',
      attendanceLabel: 'حالة الحضور',
      attendingYes: 'سأحضر',
      attendingNo: 'أعتذر عن الحضور',
      guestsLabel: 'عدد الضيوف',
      guestsUnit: 'ضيف',
      guestsPlural: 'ضيوف',
      noteLabel: 'رسالة اختيارية للعروسين',
      notePlaceholder: 'اكتب دعوة طيبة أو تهنئة لأيوب وليندا...',
      submitButton: 'تأكيد الحضور',
      submitting: 'جاري الإرسال...',
      errorNameRequired: 'يرجى كتابة الاسم الكامل للمتابعة.',
      errorNetwork: 'تعذر الإرسال في الوقت الحالي. يرجى المحاولة مرة أخرى.',
      thankYouTitle: 'شكراً لكم من القلب',
      previewNoticeBody:
        'تم تنسيق تأكيدكم بنجاح. نظراً لعدم ربط خدمة قاعدة بيانات أو واتساب بعد، لم يتم إرسال البيانات تلقائياً إلى خادم خارجي — يمكنكم نسخ نص الرد أدناه.',
      liveSuccessBody:
        'تم استلام تأكيد حضوركم بنجاح. نتطلع بشوق لمشاركتكم فرحتنا.',
      copyResponse: 'نسخ نص التأكيد',
      copiedResponse: 'تم النسخ',
      editResponse: 'إرسال رد آخر',
    },
    highlights: {
      eyebrow: 'فصول الأمسية',
      countdown: 'العد التنازلي',
      schedule: 'البرنامج',
      venue: 'الموقع',
      rsvp: 'الحضور',
      music: 'الموسيقى',
    },
    schedule: {
      eyebrow: 'تفاصيل الأمسية',
      title: 'برنامج الحفل وبطاقة الضيوف',
      subtitle: 'نظرة دافئة على محطات ليلتنا المميزة بانتظار إعلان القاعة الرسمية.',
      items: [
        {
          id: 'welcome',
          title: 'استقبال الضيوف والترحيب',
          description: 'لقاء الأحبة والضيافة الدافئة على أنغام استقبال هادئة.',
          meta: '07:00 PM',
        },
        {
          id: 'entrance',
          title: 'الزفة ودخول العروسين',
          description: 'لحظة دخول أيوب وليندا وسط تصفيق الأهل والأحبة.',
          meta: '08:00 PM',
        },
        {
          id: 'dinner',
          title: 'مأدبة عشاء الزفاف',
          description: 'عشاء فاخر يجمع العائلتين والأصدقاء على مائدة الفرح.',
          meta: '09:00 PM',
        },
        {
          id: 'cake',
          title: 'قطع الكيك والاحتفال',
          description: 'لحظات موسيقية مبهجة وذكريات خالدة مع العروسين.',
          meta: '10:15 PM',
        },
        {
          id: 'dress',
          title: 'إرشادات الأناقة',
          description: 'إطلالة مسائية أنيقة تليق بليلة شتوية دافئة في عمّان.',
          meta: 'Formal',
        },
      ],
    },
    closing: {
      title: 'وجودكم فرحتنا',
      body: 'نتطلع لمشاركتكم أجمل اللحظات وصنع ذكريات تبقى في القلب.',
      names: 'أيوب & ليندا',
      epilogueDate: '٢٠ ديسمبر ٢٠٢٦',
      epilogueTag: 'بكل الحب والامتنان',
    },
  },
  en: {
    langToggle: 'AR',
    langAria: 'التبديل إلى العربية',
    envelopeTitle: 'Wedding Invitation',
    monogramLeft: 'A',
    monogramRight: 'L',
    sealHint: 'Touch the seal to open your invitation.',
    musicOn: 'Pause Music',
    musicOff: 'Play Music',
    musicShort: 'Music',
    replayEnvelope: 'Replay Envelope Experience',
    bismillah: 'With Blessings & Joy',
    introLine: 'Together with their families,',
    groomLabel: 'Groom',
    groomName: 'Ayoub Istaiteh',
    brideLabel: 'Bride',
    brideName: 'Linda Salem',
    secondaryEnglishIntro: 'With love and joy,',
    secondaryEnglishNames: 'Ayoub Istaiteh & Linda Salem',
    secondaryEnglishClosing:
      'We are honored to invite you to share the most beautiful moments of our lives.',
    closingLine:
      'Request the pleasure of your company as they celebrate their wedding day.',
    dateEyebrow: 'Save The Date',
    dateHeadlineEn: '20 DECEMBER 2026',
    dateFull: 'Sunday, December 20, 2026',
    timezoneNote: 'Jordan Local Time (Asia/Amman)',
    calendarMonth: 'December 2026',
    countdown: {
      eyebrow: 'Counting Down Together',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      arrived: 'The Wedding Day Has Arrived!',
    },
    venue: {
      eyebrow: 'The Venue',
      title: 'Location Details',
      tbaPrimary: 'Venue details will be announced soon.',
      tbaSecondary: 'سيتم الإعلان عن موقع الحفل قريباً.',
      tbaNote:
        'Venue name, full address, celebration time, and Google Maps directions will appear here once announced.',
      nameLabel: 'Venue',
      timeLabel: 'Time',
      addressLabel: 'Address',
      openMap: 'Get Directions',
    },
    rsvp: {
      eyebrow: 'RSVP',
      title: 'Kindly Reply',
      subtitle: 'Please confirm your attendance to celebrate this special night with us.',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      attendanceLabel: 'Attendance Status',
      attendingYes: 'I Will Attend',
      attendingNo: 'Unable to Attend',
      guestsLabel: 'Number of Guests',
      guestsUnit: 'Guest',
      guestsPlural: 'Guests',
      noteLabel: 'Personal Message (Optional)',
      notePlaceholder: 'Write a warm note or blessing for Ayoub & Linda...',
      submitButton: 'Confirm Attendance',
      submitting: 'Submitting...',
      errorNameRequired: 'Please enter your full name to continue.',
      errorNetwork: 'Could not submit right now. Please try again.',
      thankYouTitle: 'Thank You Warmly',
      previewNoticeBody:
        'Your RSVP summary is ready. Because no live database or messaging integration is connected yet, nothing was saved remotely—you may copy your formatted reply below.',
      liveSuccessBody:
        'Your attendance response has been received. We cannot wait to celebrate with you.',
      copyResponse: 'Copy RSVP Text',
      copiedResponse: 'Copied',
      editResponse: 'Submit Another Response',
    },
    highlights: {
      eyebrow: 'Wedding Chapters',
      countdown: 'Countdown',
      schedule: 'Program',
      venue: 'Venue',
      rsvp: 'RSVP',
      music: 'Music',
    },
    schedule: {
      eyebrow: 'Evening Flow',
      title: 'Celebration Program & Guest Guide',
      subtitle: 'A curated glimpse into the evening timeline while final venue details are announced.',
      items: [
        {
          id: 'welcome',
          title: 'Guest Reception & Welcome',
          description: 'Warm hospitality and soft ambient melodies as guests arrive.',
          meta: '07:00 PM',
        },
        {
          id: 'entrance',
          title: 'Grand Couple Entrance',
          description: 'Ayoub & Linda enter together surrounded by family and friends.',
          meta: '08:00 PM',
        },
        {
          id: 'dinner',
          title: 'Wedding Dinner Banquet',
          description: 'An intimate celebratory dinner shared around the table.',
          meta: '09:00 PM',
        },
        {
          id: 'cake',
          title: 'Cake Cutting & Celebration',
          description: 'Joyful music, dancing, and timeless evening memories.',
          meta: '10:15 PM',
        },
        {
          id: 'dress',
          title: 'Evening Attire Note',
          description: 'Formal black-tie or elegant winter evening wear.',
          meta: 'Formal',
        },
      ],
    },
    closing: {
      title: 'Your Presence Is Our Joy',
      body: 'We look forward to sharing our happiest moments and creating memories that stay forever in our hearts.',
      names: 'Ayoub & Linda',
      epilogueDate: 'December 20, 2026',
      epilogueTag: 'With Love & Gratitude',
    },
  },
} as const;
