import React, { useState } from 'react';

const Terms = () => {
  const [language, setLanguage] = useState("english");

  const content = {
    english: {
      title: "Terms and Conditions of Use",
      effectiveDate: "Effective Date: March 7, 2025",
      paragraphs: [
        "Welcome to DIAB SARL. Please read these Terms and Conditions carefully before accessing, using, or obtaining any materials, information, products, or services from our website, mobile applications, or any other platform (collectively, 'Our Website'). By accessing or using Our Website, you agree to be bound by these Terms and our Privacy Policy. If you do not accept all of these Terms, you may not use Our Website.",
        "Throughout these Terms, 'we,' 'us,' 'our,' and 'DIAB SARL' refer to DIAB SARL, a legally registered company operating in Morocco, with its headquarters located in Casablanca. 'You' and 'your' refer to you, the user of Our Website."
      ],
      sections: [
        {
          heading: "1. Modifications to Terms",
          content: "We reserve the right to update these Terms at any time, for any reason, by posting a new version on Our Website. Your continued use of Our Website after changes have been posted constitutes your acceptance of the modified Terms. We encourage you to review these Terms periodically. If you disagree with any part of these Terms, your only recourse is to stop using Our Website immediately."
        },
        {
          heading: "2. Our Role as a Platform",
          content: "DIAB SARL is <strong>NOT</strong> a direct provider of automotive products or services. Our Website functions as a platform that connects users with automotive-related services, including but not limited to car rentals, sales, repairs, maintenance, and financing provided by third-party service providers ('Service Providers'). DIAB SARL does not own, operate, or control the vehicles or services listed on Our Website. The Service Providers are entirely responsible for their offerings, and their own terms and conditions apply to any transactions made through Our Website. You are responsible for reviewing and accepting the terms set by the Service Providers before making a booking or purchase. DIAB SARL is not liable for any issues arising from your transactions, including cancellations, refunds, vehicle conditions, delays, pricing errors, or service failures. Your interactions with Service Providers are at your own risk. The display of any Service Provider, vehicle, or service on Our Website does not imply endorsement, sponsorship, or affiliation between DIAB SARL and the Service Provider."
        },
        {
          heading: "3. Booking Through DIAB SARL",
          content: "If you make a booking through Our Website, the contract is solely between you and the respective Service Provider. DIAB SARL only acts as a facilitator, providing access to various automotive services but not handling the transactions directly.<br /><br /><strong>Booking Terms:</strong><br />- All bookings are subject to availability and confirmation by the Service Provider.<br />- Any changes, cancellations, or refunds must be handled directly with the Service Provider.<br />- DIAB SARL is not responsible for payment disputes, additional fees, insurance claims, or any other transaction-related matters.<br />- Prices displayed on Our Website are obtained from Service Providers and may change without notice.<br />- Currency conversions displayed (if applicable) are for informational purposes only and may not reflect real-time exchange rates."
        },
        {
          heading: "4. Intellectual Property Rights",
          content: "All content on Our Website, including but not limited to text, images, logos, trademarks, service marks, and software, is owned by DIAB SARL or its licensors. Unauthorized use, reproduction, modification, distribution, or exploitation of Our Website’s content for commercial purposes is strictly prohibited. You may only download, print, or copy materials for personal, non-commercial use. Any violation of these Intellectual Property Rights may result in legal action."
        },
        {
          heading: "5. User Responsibilities",
          content: "You agree to use Our Website lawfully and ethically. Specifically, you agree <strong>NOT</strong> to:<br />- Provide false, misleading, or inaccurate information.<br />- Use Our Website for fraudulent activities, including fake bookings.<br />- Attempt unauthorized access to Our Website’s systems.<br />- Use automated tools to extract data (“screen scraping”).<br />- Copy, reproduce, sell, or exploit Our Website’s content.<br />- Post or transmit content that is illegal, offensive, defamatory, or violates third-party rights.<br />- Engage in any activity that disrupts the proper functioning of Our Website.<br />We reserve the right to suspend or terminate your access to Our Website if you violate these Terms."
        },
        {
          heading: "6. Limitation of Liability",
          content: "To the fullest extent permitted by law, DIAB SARL disclaims all warranties regarding Our Website and its content. We are not liable for:<br />- Errors, inaccuracies, or delays in information displayed.<br />- Any transactions between users and third-party Service Providers.<br />- Losses or damages incurred due to reliance on Our Website’s content.<br />- Any technical failures, malware, or security breaches affecting user data.<br />- Any indirect, incidental, or consequential damages, including loss of profits, business interruption, or personal injury arising from the use of Our Website."
        },
        {
          heading: "7. Dispute Resolution and Governing Law",
          content: "All disputes arising from these Terms shall be resolved through confidential arbitration in Casablanca, Morocco. By accepting these Terms, you waive your right to participate in class-action lawsuits.<br /><br />These Terms are governed by the laws of Morocco. Any legal disputes shall be subject to the exclusive jurisdiction of the courts of Casablanca."
        },
        {
          heading: "8. Data Privacy and Security",
          content: "DIAB SARL values your privacy. By using Our Website, you agree to our Privacy Policy, which outlines how we collect, store, and use your personal data. While we implement security measures, DIAB SARL cannot guarantee absolute data protection and is not responsible for unauthorized access to user data."
        },
        {
          heading: "9. Contact Information",
          content: "For any questions regarding these Terms, please contact us at:<br />DIAB SARL<br />Headquarters: Casablanca, Morocco<br />Email: Snaibcar@gmail.com<br />Phone: +212 659-775582<br /><br />By using Our Website, you acknowledge that you have read, understood, and agreed to these Terms and our Privacy Policy. Failure to comply may result in the suspension or termination of your access to Our Website."
        }
      ]
    },
    french: {
      title: "Conditions Générales d'Utilisation",
      effectiveDate: "Date d'effet : 7 mars 2025",
      paragraphs: [
        "Bienvenue chez DIAB SARL. Veuillez lire attentivement ces Conditions Générales avant d'accéder, d'utiliser ou d'obtenir tout matériel, information, produit ou service depuis notre site web, nos applications mobiles ou toute autre plateforme (collectivement, 'notre site'). En accédant ou en utilisant notre site, vous acceptez d'être lié par ces Conditions ainsi que par notre Politique de Confidentialité. Si vous n'acceptez pas toutes ces Conditions, vous ne pouvez pas utiliser notre site.",
        "Dans ces Conditions, 'nous', 'notre' et 'DIAB SARL' désignent DIAB SARL, une société légalement enregistrée opérant au Maroc, avec son siège social situé à Casablanca. 'Vous' désigne l'utilisateur de notre site."
      ],
      sections: [
        {
          heading: "1. Modifications des Conditions",
          content: "Nous nous réservons le droit de mettre à jour ces Conditions à tout moment, pour quelque raison que ce soit, en publiant une nouvelle version sur notre site. Votre utilisation continue de notre site après la publication des modifications constitue votre acceptation des Conditions modifiées. Nous vous encourageons à consulter ces Conditions périodiquement. Si vous n'acceptez pas une partie quelconque de ces Conditions, la seule solution est de cesser d'utiliser notre site immédiatement."
        },
        {
          heading: "2. Notre rôle en tant que plateforme",
          content: "DIAB SARL n'est pas un fournisseur direct de produits ou services automobiles. Notre site sert de plateforme permettant de connecter les utilisateurs aux services automobiles, y compris, mais sans s'y limiter, la location, la vente, la réparation, l'entretien et le financement fournis par des prestataires tiers ('Prestataires'). DIAB SARL ne possède, n'exploite, ni ne contrôle les véhicules ou services présentés sur notre site. Les Prestataires sont entièrement responsables de leurs offres, et leurs propres conditions s'appliquent à toute transaction réalisée via notre site. Vous êtes responsable de lire et d'accepter les conditions définies par les Prestataires avant de procéder à une réservation ou un achat. DIAB SARL n'est pas responsable des problèmes pouvant survenir lors de vos transactions, y compris annulations, remboursements, état des véhicules, retards, erreurs de tarification ou défaillances de service. Vos interactions avec les Prestataires se font à vos risques et périls. L'affichage de tout Prestataire, véhicule ou service sur notre site n'implique pas un quelconque soutien, sponsoring ou affiliation entre DIAB SARL et le Prestataire."
        },
        {
          heading: "3. Réservation via DIAB SARL",
          content: "Si vous effectuez une réservation via notre site, le contrat est uniquement établi entre vous et le Prestataire concerné. DIAB SARL agit uniquement comme facilitateur, fournissant l'accès à divers services automobiles sans gérer directement les transactions.<br /><br /><strong>Conditions de réservation :</strong><br />- Toutes les réservations sont soumises à disponibilité et confirmation par le Prestataire.<br />- Toute modification, annulation ou remboursement doit être gérée directement avec le Prestataire.<br />- DIAB SARL n'est pas responsable des litiges de paiement, frais supplémentaires, réclamations d'assurance ou autres questions liées aux transactions.<br />- Les tarifs affichés sur notre site sont obtenus auprès des Prestataires et peuvent changer sans préavis.<br />- Les conversions de devises affichées (le cas échéant) sont à titre informatif et ne reflètent pas les taux de change en temps réel."
        },
        {
          heading: "4. Droits de Propriété Intellectuelle",
          content: "Tout le contenu de notre site, incluant mais ne se limitant pas aux textes, images, logos, marques et logiciels, est la propriété de DIAB SARL ou de ses concédants. Toute utilisation, reproduction, modification, distribution ou exploitation non autorisée du contenu de notre site à des fins commerciales est strictement interdite. Vous ne pouvez télécharger, imprimer ou copier le contenu qu'à des fins personnelles et non commerciales. Toute violation de ces droits de propriété intellectuelle pourra entraîner des actions en justice."
        },
        {
          heading: "5. Responsabilités de l'Utilisateur",
          content: "Vous acceptez d'utiliser notre site de manière légale et éthique. Plus précisément, vous acceptez de ne PAS :<br />- Fournir des informations fausses, trompeuses ou inexactes.<br />- Utiliser notre site pour des activités frauduleuses, y compris des réservations fictives.<br />- Tenter d'accéder sans autorisation aux systèmes de notre site.<br />- Utiliser des outils automatisés pour extraire des données (scraping).<br />- Copier, reproduire, vendre ou exploiter le contenu de notre site.<br />- Publier ou transmettre du contenu illégal, offensant, diffamatoire ou violant les droits de tiers.<br />- Engager toute activité perturbant le bon fonctionnement de notre site.<br />Nous nous réservons le droit de suspendre ou de résilier votre accès à notre site si vous violez ces Conditions."
        },
        {
          heading: "6. Limitation de Responsabilité",
          content: "Dans la mesure permise par la loi, DIAB SARL décline toute garantie concernant notre site et son contenu. Nous ne sommes pas responsables de :<br />- Erreurs, inexactitudes ou retards dans les informations affichées.<br />- Toute transaction entre utilisateurs et prestataires tiers.<br />- Pertes ou dommages résultant de la confiance accordée au contenu de notre site.<br />- Tout échec technique, malware ou faille de sécurité affectant les données des utilisateurs.<br />- Tout dommage indirect, accessoire ou consécutif, incluant la perte de profits, l'interruption d'activité ou des blessures personnelles résultant de l'utilisation de notre site."
        },
        {
          heading: "7. Résolution des Litiges et Loi Applicable",
          content: "Tous les litiges découlant de ces Conditions seront résolus par arbitrage confidentiel à Casablanca, Maroc. En acceptant ces Conditions, vous renoncez à votre droit de participer à des actions collectives.<br /><br />Ces Conditions sont régies par les lois du Maroc. Tout litige sera soumis à la juridiction exclusive des tribunaux de Casablanca."
        },
        {
          heading: "8. Confidentialité et Sécurité des Données",
          content: "DIAB SARL accorde une grande importance à votre confidentialité. En utilisant notre site, vous acceptez notre Politique de Confidentialité, qui détaille comment nous collectons, stockons et utilisons vos données personnelles. Bien que nous mettions en œuvre des mesures de sécurité, DIAB SARL ne peut garantir une protection absolue des données et n'est pas responsable d'un accès non autorisé aux données des utilisateurs."
        },
        {
          heading: "9. Coordonnées",
          content: "Pour toute question concernant ces Conditions, veuillez nous contacter à :<br />DIAB SARL<br />Siège social : Casablanca, Maroc<br />Email : Snaibcar@gmail.com<br />Téléphone : +212 659-775582<br /><br />En utilisant notre site, vous reconnaissez avoir lu, compris et accepté ces Conditions et notre Politique de Confidentialité. Le non-respect de ces conditions peut entraîner la suspension ou la résiliation de votre accès à notre site."
        }
      ]
    },
    arabic: {
      title: "الشروط والأحكام للاستخدام",
      effectiveDate: "تاريخ السريان: 7 مارس 2025",
      paragraphs: [
        "مرحباً بكم في DIAB SARL. يرجى قراءة هذه الشروط والأحكام بعناية قبل الوصول أو استخدام أو الحصول على أي مواد أو معلومات أو منتجات أو خدمات من موقعنا الإلكتروني أو تطبيقاتنا المحمولة أو أي منصة أخرى (يشار إليها مجتمعة بـ 'موقعنا'). باستخدامك لموقعنا، فإنك توافق على الالتزام بهذه الشروط وبسياسة الخصوصية الخاصة بنا. إذا لم تقبل جميع هذه الشروط، فلا يحق لك استخدام موقعنا.",
        "في هذه الشروط، يُشار إلى 'نحن' و'لنا' و'DIAB SARL' بالشركة DIAB SARL، وهي شركة مسجلة قانونياً وتعمل في المغرب، ومقرها الرئيسي في الدار البيضاء. ويُشار إلى 'أنت' للمستخدم الذي يتصفح موقعنا."
      ],
      sections: [
        {
          heading: "1. تعديلات على الشروط",
          content: "نحن نحتفظ بالحق في تحديث هذه الشروط في أي وقت ولأي سبب عن طريق نشر نسخة جديدة على موقعنا. إن استمرارك في استخدام موقعنا بعد نشر التغييرات يُعد قبولاً منك للشروط المعدلة. ننصحك بمراجعة هذه الشروط بشكل دوري. إذا كنت غير موافق على أي جزء من هذه الشروط، فالخيار الوحيد هو التوقف عن استخدام موقعنا فوراً."
        },
        {
          heading: "2. دورنا كمنصة",
          content: "تعتبر DIAB SARL ليست مزودًا مباشرًا للمنتجات أو الخدمات المتعلقة بالسيارات. يعمل موقعنا كمنصة تربط المستخدمين بالخدمات المتعلقة بالسيارات، بما في ذلك على سبيل المثال لا الحصر تأجير السيارات، والبيع، والإصلاح، والصيانة، والتمويل المقدم من مقدمي الخدمات الخارجيين ('مقدمي الخدمات'). لا تملك DIAB SARL، ولا تدير، ولا تتحكم في المركبات أو الخدمات المعروضة على موقعنا. مقدمو الخدمات هم المسؤولون بالكامل عن عروضهم، وتطبق شروطهم الخاصة على أي معاملات تتم عبر موقعنا. أنت مسؤول عن مراجعة وقبول الشروط التي يحددها مقدمو الخدمات قبل إجراء أي حجز أو شراء. لا تتحمل DIAB SARL أي مسؤولية عن أي مشكلات تنشأ عن معاملاتك، بما في ذلك الإلغاءات أو الاستردادات أو حالة المركبات أو التأخيرات أو أخطاء التسعير أو إخفاقات الخدمة. تفاعلاتك مع مقدمي الخدمات تتم على مسؤوليتك الشخصية. عرض أي مقدم خدمة أو مركبة أو خدمة على موقعنا لا يعني الموافقة أو الرعاية أو الانتماء بين DIAB SARL ومقدم الخدمة."
        },
        {
          heading: "3. الحجز عبر DIAB SARL",
          content: "إذا قمت بإجراء حجز عبر موقعنا، فإن العقد يكون فقط بينك وبين مقدم الخدمة المعني. تعمل DIAB SARL فقط كوسيط، حيث توفر الوصول إلى خدمات السيارات المختلفة دون إدارة المعاملات مباشرة.<br /><br /><strong>شروط الحجز:</strong><br />- جميع الحجوزات تخضع للتوفر والتأكيد من قبل مقدم الخدمة.<br />- يجب التعامل مع أي تغييرات أو إلغاءات أو استردادات مباشرة مع مقدم الخدمة.<br />- لا تتحمل DIAB SARL مسؤولية نزاعات الدفع أو الرسوم الإضافية أو مطالبات التأمين أو أي مسائل أخرى تتعلق بالمعاملات.<br />- الأسعار المعروضة على موقعنا يتم الحصول عليها من مقدمي الخدمات وقد تتغير دون إشعار مسبق.<br />- تحويلات العملات المعروضة (إن وُجدت) هي لأغراض إعلامية فقط وقد لا تعكس أسعار الصرف الفعلية في الوقت الحالي."
        },
        {
          heading: "4. حقوق الملكية الفكرية",
          content: "جميع المحتويات على موقعنا، بما في ذلك على سبيل المثال لا الحصر النصوص والصور والشعارات والعلامات التجارية وبرامج الحاسوب، مملوكة لـ DIAB SARL أو للمرخصين التابعين لها. يُمنع الاستخدام أو الاستنساخ أو التعديل أو التوزيع أو استغلال محتوى موقعنا لأغراض تجارية دون إذن. يمكنك تحميل أو طباعة أو نسخ المواد للاستخدام الشخصي وغير التجاري فقط. أي انتهاك لهذه الحقوق قد يؤدي إلى اتخاذ إجراءات قانونية."
        },
        {
          heading: "5. مسؤوليات المستخدم",
          content: "أنت توافق على استخدام موقعنا بطريقة قانونية وأخلاقية. وبشكل محدد، فإنك توافق على عدم:<br />- تقديم معلومات كاذبة أو مضللة أو غير دقيقة.<br />- استخدام موقعنا في أنشطة احتيالية، بما في ذلك الحجوزات الوهمية.<br />- محاولة الوصول غير المصرح به إلى أنظمة موقعنا.<br />- استخدام أدوات آلية لاستخراج البيانات ('screen scraping').<br />- نسخ أو إعادة إنتاج أو بيع أو استغلال محتوى موقعنا.<br />- نشر أو إرسال محتوى غير قانوني أو مسيء أو تشهيري أو ينتهك حقوق الغير.<br />- الانخراط في أي نشاط يعطل الأداء السليم لموقعنا.<br />نحتفظ بالحق في تعليق أو إنهاء وصولك إلى موقعنا إذا انتهكت هذه الشروط."
        },
        {
          heading: "6. تحديد المسؤولية",
          content: "إلى أقصى حد يسمح به القانون، تخلي DIAB SARL مسؤوليتها عن جميع الضمانات المتعلقة بموقعها ومحتواه. نحن غير مسؤولين عن:<br />- الأخطاء أو عدم الدقة أو التأخيرات في المعلومات المعروضة.<br />- أي معاملات بين المستخدمين ومقدمي الخدمات الخارجيين.<br />- الخسائر أو الأضرار الناتجة عن الاعتماد على محتوى موقعنا.<br />- أي إخفاقات تقنية أو برمجيات خبيثة أو اختراقات أمنية تؤثر على بيانات المستخدمين.<br />- أي أضرار غير مباشرة أو عرضية أو تبعية، بما في ذلك فقدان الأرباح أو توقف الأعمال أو الإصابات الشخصية الناجمة عن استخدام موقعنا."
        },
        {
          heading: "7. حل النزاعات والقانون الواجب التطبيق",
          content: "جميع النزاعات الناشئة عن هذه الشروط سيتم حلها عن طريق التحكيم السري في الدار البيضاء، المغرب. من خلال قبولك لهذه الشروط، فإنك تتنازل عن حقك في المشاركة في الدعاوى الجماعية.<br /><br />تخضع هذه الشروط لقوانين المغرب، وأي نزاعات قانونية ستكون تحت الاختصاص الحصري لمحاكم الدار البيضاء."
        },
        {
          heading: "8. خصوصية وأمان البيانات",
          content: "تولي DIAB SARL أهمية كبيرة لخصوصيتك. باستخدامك لموقعنا، فإنك توافق على سياسة الخصوصية الخاصة بنا التي توضح كيفية جمع وتخزين واستخدام بياناتك الشخصية. على الرغم من تطبيقنا لإجراءات أمنية، لا يمكن لـ DIAB SARL ضمان حماية مطلقة للبيانات ولا تتحمل المسؤولية عن الوصول غير المصرح به إلى بيانات المستخدمين."
        },
        {
          heading: "9. معلومات الاتصال",
          content: "لأي استفسارات بخصوص هذه الشروط، يرجى الاتصال بنا على:<br />DIAB SARL<br />المقر الرئيسي: الدار البيضاء، المغرب<br />البريد الإلكتروني: Snaibcar@gmail.com<br />الهاتف: +212 659-775582<br /><br />باستخدامك لموقعنا، فإنك تقر بأنك قد قرأت وفهمت ووافقت على هذه الشروط وسياسة الخصوصية الخاصة بنا. عدم الامتثال قد يؤدي إلى تعليق أو إنهاء وصولك إلى موقعنا."
        }
      ]
    }
  };

  // Appliquer la direction RTL pour l'arabe
  const containerStyle = {
    ...styles.container,
    direction: language === "arabic" ? "rtl" : "ltr"
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button style={styles.tabButton} onClick={() => setLanguage("english")}>English</button>
        <button style={styles.tabButton} onClick={() => setLanguage("french")}>Français</button>
        <button style={styles.tabButton} onClick={() => setLanguage("arabic")}>العربية</button>
      </div>
      <div style={styles.content}>
        <h1 style={styles.title}>{content[language].title}</h1>
        <h3 style={styles.effectiveDate}>{content[language].effectiveDate}</h3>
        {content[language].paragraphs.map((para, index) => (
          <p style={styles.paragraph} key={index}>{para}</p>
        ))}
        {content[language].sections.map((section, index) => (
          <div key={index}>
            <h2 style={styles.sectionHeading}>{section.heading}</h2>
            <p style={styles.paragraph} dangerouslySetInnerHTML={{ __html: section.content }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    backgroundColor: '#f9f9f9'
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '10px'
  },
  effectiveDate: {
    textAlign: 'center',
    fontSize: '18px',
    marginBottom: '20px',
    color: '#555'
  },
  paragraph: {
    marginBottom: '20px'
  },
  sectionHeading: {
    fontSize: '24px',
    marginTop: '30px',
    marginBottom: '10px',
    color: '#333'
  },
  tabButton: {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default Terms;
