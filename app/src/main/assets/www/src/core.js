var NERO = (function () {
'use strict';

/* ============ تطبيع الكلمات العربية ============ */
const TASH = /[\u064B-\u065F\u0670\u0640]/g;
function d2a(s) {
  return s.replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 1776));
}
function norm(s) {
  return d2a(String(s).replace(TASH, ''))
    .replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
    .replace(/_/g, '-').toLowerCase();
}
function mk(o) {
  const m = new Map();
  Object.keys(o).forEach(k => k.split('|').forEach(a => m.set(norm(a), o[k])));
  return m;
}
function words(o) {
  const r = [];
  Object.keys(o).forEach(k => k.split('|').forEach(a => r.push({ ar: a, en: o[k], n: norm(a) })));
  return r;
}

/* ============ القواميس ============ */
const R = {};

R.tags = {
  'صفحة|صفحة_ويب': 'html', 'راس|رأس|راس_الصفحة': 'head', 'جسم|جسد|محتوى_الصفحة': 'body',
  'عنوان_الصفحة': 'title', 'عنوان|عنوان1': 'h1', 'عنوان2': 'h2', 'عنوان3': 'h3', 'عنوان4': 'h4', 'عنوان5': 'h5', 'عنوان6': 'h6',
  'فقرة': 'p', 'رابط': 'a', 'صورة': 'img', 'قسم': 'div', 'نص': 'span', 'زر': 'button', 'ادخال': 'input',
  'نموذج': 'form', 'تسمية': 'label', 'قائمة': 'ul', 'قائمة_مرقمة': 'ol', 'عنصر': 'li',
  'جدول': 'table', 'صف': 'tr', 'خلية': 'td', 'راس_خلية': 'th', 'راس_الجدول': 'thead', 'جسم_الجدول': 'tbody', 'ذيل_الجدول': 'tfoot',
  'سطر_جديد': 'br', 'خط': 'hr', 'ميتا': 'meta', 'ربط': 'link', 'ستايل|نمط': 'style', 'سكربت|سكريبت|برنامج': 'script',
  'ترويسة': 'header', 'تذييل': 'footer', 'تنقل': 'nav', 'رئيسي': 'main', 'مقطع': 'section', 'مقالة': 'article', 'جانبي': 'aside',
  'عريض': 'strong', 'غامق': 'b', 'مائل': 'em', 'ايطالي': 'i', 'تسطير': 'u', 'صغير': 'small', 'تمييز': 'mark',
  'كود': 'code', 'منسق': 'pre', 'اقتباس': 'blockquote', 'فيديو': 'video', 'صوت': 'audio', 'مصدر': 'source',
  'اطار': 'iframe', 'لوحة': 'canvas', 'اختيار': 'select', 'خيار': 'option', 'مجموعة_خيارات': 'optgroup',
  'منطقة_نص': 'textarea', 'رسم_متجه': 'svg', 'تفاصيل': 'details', 'ملخص': 'summary', 'حوار': 'dialog',
  'تقدم': 'progress', 'مقياس': 'meter', 'مجموعة': 'fieldset', 'وسيلة_ايضاح': 'legend', 'شكل': 'figure',
  'تعليق_الشكل': 'figcaption', 'مرفوع': 'sup', 'منخفض': 'sub', 'محذوف': 'del', 'مضاف': 'ins',
  'قالب': 'template', 'بدون_سكربت': 'noscript', 'اختصار': 'abbr', 'وقت': 'time', 'قاعدة': 'base', 'مسار_صوت': 'track'
};
R.attrs = {
  'فئة|كلاس': 'class', 'معرف': 'id', 'نمط': 'style', 'وجهة|مسار': 'href', 'مصدر': 'src', 'بديل': 'alt',
  'عرض': 'width', 'ارتفاع': 'height', 'نوع': 'type', 'اسم': 'name', 'قيمة': 'value', 'نص_توضيحي': 'placeholder',
  'لغة': 'lang', 'اتجاه': 'dir', 'ترميز': 'charset', 'محتوى': 'content', 'علاقة': 'rel', 'هدف': 'target',
  'تلميح': 'title', 'معطل': 'disabled', 'مطلوب': 'required', 'محدد': 'checked', 'للقراءة_فقط': 'readonly',
  'تركيز_تلقائي': 'autofocus', 'مخفي': 'hidden', 'مختار': 'selected', 'متعدد': 'multiple', 'ادنى': 'min',
  'اقصى': 'max', 'خطوة': 'step', 'صفوف': 'rows', 'اعمدة': 'cols', 'امتداد_اعمدة': 'colspan', 'امتداد_صفوف': 'rowspan',
  'اجراء': 'action', 'طريقة': 'method', 'لاجل': 'for', 'ازرار_تحكم': 'controls', 'تشغيل_تلقائي': 'autoplay',
  'تكرار': 'loop', 'صامت': 'muted', 'اقصى_طول': 'maxlength', 'ادنى_طول': 'minlength', 'نمط_ادخال': 'pattern',
  'تاجيل': 'defer', 'غير_متزامن': 'async', 'قبول': 'accept', 'ملصق': 'poster', 'حجم': 'size',
  'اكمال_تلقائي': 'autocomplete', 'قابل_للتحرير': 'contenteditable', 'قابل_للسحب': 'draggable',
  'فهرس_التبويب': 'tabindex', 'دور': 'role', 'مفتوح': 'open', 'تحميل': 'loading',
  'عند_الضغط|عند_النقر': 'onclick', 'عند_التغيير': 'onchange', 'عند_الادخال': 'oninput', 'عند_الارسال': 'onsubmit',
  'عند_التحميل': 'onload', 'عند_مرور_الماوس': 'onmouseover', 'عند_خروج_الماوس': 'onmouseout',
  'عند_ضغط_مفتاح': 'onkeydown', 'عند_رفع_مفتاح': 'onkeyup', 'عند_التركيز': 'onfocus', 'عند_فقدان_التركيز': 'onblur',
  'عند_نقر_مزدوج': 'ondblclick', 'عند_اللمس': 'ontouchstart', 'عند_التمرير': 'onscroll', 'عند_الخطا': 'onerror'
};
R.attrVals = {
  type: {
    'نص': 'text', 'كلمة_مرور': 'password', 'بريد': 'email', 'رقم': 'number', 'مربع_اختيار': 'checkbox',
    'خيار_واحد': 'radio', 'ارسال': 'submit', 'زر': 'button', 'ملف': 'file', 'تاريخ': 'date', 'وقت': 'time',
    'لون': 'color', 'مدى': 'range', 'مخفي': 'hidden', 'بحث': 'search', 'هاتف': 'tel', 'رابط_ويب': 'url',
    'اعادة_ضبط': 'reset', 'صورة': 'image', 'وحدة': 'module'
  },
  dir: { 'يمين': 'rtl', 'يسار': 'ltr', 'تلقائي': 'auto' },
  target: { 'جديدة': '_blank', 'نفسها': '_self', 'الاب': '_parent', 'الاعلى': '_top' },
  method: { 'جلب': 'get', 'ارسال': 'post' },
  rel: { 'ورقة_انماط': 'stylesheet', 'ايقونة': 'icon' },
  lang: { 'عربي': 'ar', 'عربية': 'ar', 'انجليزي': 'en', 'انكليزي': 'en' },
  name: { 'منفذ_العرض': 'viewport', 'وصف': 'description', 'كلمات_مفتاحية': 'keywords', 'مؤلف': 'author', 'لون_الثيم': 'theme-color' },
  loading: { 'كسول': 'lazy' }
};

R.cssProps = {
  'لون|لون-النص': 'color', 'خلفية': 'background', 'لون-الخلفية': 'background-color', 'صورة-الخلفية': 'background-image',
  'حجم-الخلفية': 'background-size', 'موضع-الخلفية': 'background-position', 'تكرار-الخلفية': 'background-repeat',
  'تثبيت-الخلفية': 'background-attachment', 'قص-الخلفية': 'background-clip',
  'حجم-الخط': 'font-size', 'نوع-الخط|عائلة-الخط': 'font-family', 'وزن-الخط': 'font-weight', 'نمط-الخط': 'font-style', 'خط': 'font',
  'محاذاة-النص': 'text-align', 'زخرفة-النص': 'text-decoration', 'تحويل-النص': 'text-transform', 'ظل-النص': 'text-shadow',
  'مسافة-اول-سطر': 'text-indent', 'قص-النص': 'text-overflow', 'ارتفاع-السطر': 'line-height',
  'تباعد-الحروف': 'letter-spacing', 'تباعد-الكلمات': 'word-spacing',
  'عرض': 'width', 'ارتفاع': 'height', 'ادنى-عرض': 'min-width', 'اقصى-عرض': 'max-width',
  'ادنى-ارتفاع': 'min-height', 'اقصى-ارتفاع': 'max-height',
  'هامش': 'margin', 'هامش-علوي': 'margin-top', 'هامش-سفلي': 'margin-bottom', 'هامش-ايسر': 'margin-left', 'هامش-ايمن': 'margin-right',
  'حشو': 'padding', 'حشو-علوي': 'padding-top', 'حشو-سفلي': 'padding-bottom', 'حشو-ايسر': 'padding-left', 'حشو-ايمن': 'padding-right',
  'حدود': 'border', 'حدود-علوي': 'border-top', 'حدود-سفلي': 'border-bottom', 'حدود-ايسر': 'border-left', 'حدود-ايمن': 'border-right',
  'استدارة-الحدود|استدارة': 'border-radius', 'لون-الحدود': 'border-color', 'سمك-الحدود': 'border-width',
  'نمط-الحدود': 'border-style', 'ادمج-الحدود': 'border-collapse', 'تباعد-الحدود': 'border-spacing',
  'مخطط': 'outline', 'ظل-الصندوق|ظل': 'box-shadow', 'حجم-الصندوق': 'box-sizing',
  'ظهور': 'display', 'موضع': 'position', 'اعلى': 'top', 'اسفل': 'bottom', 'يسار': 'left', 'يمين': 'right', 'ترتيب-الطبقة': 'z-index',
  'مرن': 'flex', 'اتجاه-المرن': 'flex-direction', 'التفاف-المرن': 'flex-wrap', 'محاذاة-المحتوى': 'justify-content',
  'محاذاة-العناصر': 'align-items', 'محاذاة-ذاتية': 'align-self', 'محاذاة-الصفوف': 'align-content', 'فجوة': 'gap',
  'نمو-المرن': 'flex-grow', 'انكماش-المرن': 'flex-shrink', 'اساس-المرن': 'flex-basis', 'ترتيب': 'order',
  'شبكة': 'grid', 'اعمدة-الشبكة': 'grid-template-columns', 'صفوف-الشبكة': 'grid-template-rows', 'عمود-الشبكة': 'grid-column',
  'صف-الشبكة': 'grid-row', 'منطقة-الشبكة': 'grid-area', 'مناطق-الشبكة': 'grid-template-areas',
  'فيض': 'overflow', 'فيض-افقي': 'overflow-x', 'فيض-عمودي': 'overflow-y', 'شفافية': 'opacity', 'رؤية': 'visibility', 'مؤشر': 'cursor',
  'انتقال': 'transition', 'مدة-الانتقال': 'transition-duration', 'تاخير-الانتقال': 'transition-delay', 'خاصية-الانتقال': 'transition-property',
  'تحويل': 'transform', 'حركة': 'animation', 'اسم-الحركة': 'animation-name', 'مدة-الحركة': 'animation-duration',
  'تاخير-الحركة': 'animation-delay', 'تكرار-الحركة': 'animation-iteration-count', 'توقيت-الحركة': 'animation-timing-function',
  'اتجاه-الحركة': 'animation-direction', 'وضع-الحركة': 'animation-fill-mode',
  'اتجاه': 'direction', 'محتوى': 'content', 'عوم': 'float', 'مسح': 'clear', 'نمط-القائمة': 'list-style',
  'ملاءمة-الكائن': 'object-fit', 'مرشح': 'filter', 'مرشح-الخلفية': 'backdrop-filter', 'مسافات-بيضاء': 'white-space',
  'كسر-الكلمات': 'word-break', 'احداث-المؤشر': 'pointer-events', 'تحديد-المستخدم': 'user-select', 'تغيير-الحجم': 'resize',
  'محاذاة-عمودية': 'vertical-align', 'نسبة-الابعاد': 'aspect-ratio', 'سلوك-التمرير': 'scroll-behavior',
  'تعبئة': 'fill', 'خط-الرسم': 'stroke', 'مصدر': 'src', 'اتجاه-الشاشة': 'orientation', 'تفضيل-الالوان': 'prefers-color-scheme'
};
R.colors = {
  'احمر': 'red', 'ازرق': 'blue', 'اخضر': 'green', 'اصفر': 'yellow', 'ابيض': 'white', 'اسود': 'black', 'رمادي': 'gray',
  'برتقالي': 'orange', 'بنفسجي': 'purple', 'وردي': 'pink', 'بني': 'brown', 'ذهبي': 'gold', 'فضي': 'silver',
  'سماوي': 'skyblue', 'تركوازي': 'turquoise', 'كحلي': 'navy', 'بيج': 'beige', 'ارجواني': 'magenta', 'عنابي': 'maroon',
  'زيتوني': 'olive', 'ليموني': 'lime', 'قرمزي': 'crimson', 'اخضر_فاتح': 'lightgreen', 'ازرق_فاتح': 'lightblue',
  'رمادي_فاتح': 'lightgray', 'رمادي_غامق': 'darkgray', 'اخضر_غامق': 'darkgreen', 'ازرق_غامق': 'darkblue',
  'احمر_غامق': 'darkred', 'شفاف': 'transparent', 'لون_حالي': 'currentColor'
};
R.cssVals = {
  'بدون|لا_شيء|بلا': 'none', 'كتلة|بلوك': 'block', 'سطري': 'inline', 'سطري_كتلة': 'inline-block', 'مرن': 'flex', 'شبكة': 'grid',
  'مطلق': 'absolute', 'نسبي': 'relative', 'ثابت': 'fixed', 'لاصق': 'sticky', 'ساكن': 'static',
  'وسط': 'center', 'يمين': 'right', 'يسار': 'left', 'اعلى': 'top', 'اسفل': 'bottom',
  'عريض': 'bold', 'عادي': 'normal', 'مائل': 'italic', 'تسطير': 'underline', 'خط_فوق': 'overline', 'يتوسطه_خط': 'line-through',
  'متصل': 'solid', 'متقطع': 'dashed', 'منقط': 'dotted', 'مزدوج': 'double', 'مخفي': 'hidden', 'ظاهر': 'visible',
  'تلقائي': 'auto', 'وراثة': 'inherit', 'صف': 'row', 'عمود': 'column', 'صف_معكوس': 'row-reverse', 'عمود_معكوس': 'column-reverse',
  'التفاف': 'wrap', 'بدون_التفاف': 'nowrap', 'توزيع_بين': 'space-between', 'توزيع_حول': 'space-around', 'توزيع_متساو': 'space-evenly',
  'بداية': 'flex-start', 'نهاية': 'flex-end', 'تمديد': 'stretch', 'تغطية': 'cover', 'احتواء': 'contain',
  'بدون_تكرار': 'no-repeat', 'تكرار': 'repeat', 'تكرار_افقي': 'repeat-x', 'تكرار_عمودي': 'repeat-y',
  'احرف_كبيرة': 'uppercase', 'احرف_صغيرة': 'lowercase', 'احرف_اولى_كبيرة': 'capitalize', 'خطي': 'linear', 'لانهائي': 'infinite',
  'تمرير': 'scroll', 'صندوق_الحدود': 'border-box', 'صندوق_المحتوى': 'content-box', 'يد': 'pointer', 'مؤشر_نص': 'text',
  'ممنوع': 'not-allowed', 'يمين_لشمال': 'rtl', 'شمال_ليمين': 'ltr', 'كلاهما': 'both', 'للامام': 'forwards',
  'تسهيل': 'ease', 'تسهيل_دخول': 'ease-in', 'تسهيل_خروج': 'ease-out', 'تسهيل_الاثنين': 'ease-in-out',
  'خط_بدون_ذيل': 'sans-serif', 'خط_بذيل': 'serif', 'خط_ثابت_العرض': 'monospace', 'شفاف': 'transparent'
};
R.cssFuncs = {
  'تدرج-خطي': 'linear-gradient', 'تدرج-دائري': 'radial-gradient', 'تدرج-مخروطي': 'conic-gradient', 'رابط': 'url',
  'حساب': 'calc', 'متغير': 'var', 'اصغر-قيمة': 'min', 'اكبر-قيمة': 'max', 'تحديد': 'clamp',
  'ازاحة': 'translate', 'ازاحة-س': 'translateX', 'ازاحة-ص': 'translateY', 'تدوير': 'rotate', 'تكبير': 'scale', 'ميلان': 'skew',
  'مكرر': 'repeat', 'ادنى-اقصى': 'minmax', 'سطوع': 'brightness', 'تمويه': 'blur', 'تباين': 'contrast'
};
R.cssUnits = {
  'بكسل': 'px', 'نسبة': '%', 'رم': 'rem', 'ام': 'em', 'ثانية': 's', 'ملي_ثانية|ملث': 'ms', 'درجة': 'deg',
  'عرض_الشاشة': 'vw', 'ارتفاع_الشاشة': 'vh', 'نقطة': 'pt', 'جزء': 'fr', 'دورة': 'turn'
};
R.cssPseudo = {
  'تمرير': 'hover', 'تركيز': 'focus', 'نشط': 'active', 'زيارة': 'visited', 'اول-ابن': 'first-child', 'اخر-ابن': 'last-child',
  'ابن-رقم': 'nth-child', 'ليس': 'not', 'محدد': 'checked', 'معطل': 'disabled', 'فارغ': 'empty', 'جذر': 'root',
  'قبل': 'before', 'بعد': 'after', 'اول-حرف': 'first-letter', 'اول-سطر': 'first-line', 'تحديد': 'selection',
  'نص-توضيحي': 'placeholder', 'داخل-التركيز': 'focus-within', 'مطلوب': 'required', 'هدف': 'target',
  'اول-نوع': 'first-of-type', 'اخر-نوع': 'last-of-type', 'يحتوي': 'has', 'ضمن': 'is'
};
R.cssAt = {
  'وسائط': 'media', 'حركة|اطارات-رئيسية': 'keyframes', 'استيراد': 'import', 'خط|خط-مخصص': 'font-face',
  'دعم': 'supports', 'ترميز': 'charset', 'صفحة': 'page', 'طبقة': 'layer', 'حاوية': 'container'
};
R.cssMedia = {
  'و': 'and', 'شاشة': 'screen', 'طباعة': 'print', 'عمودي': 'portrait', 'افقي': 'landscape', 'داكن': 'dark', 'فاتح': 'light'
};
R.jsKw = {
  'ثابت': 'const', 'متغير': 'let', 'متغير_قديم|متغير_عام': 'var', 'دالة|وظيفة': 'function', 'ارجع|ارجاع': 'return',
  'اذا': 'if', 'والا|غير_ذلك': 'else', 'لكل|من_اجل': 'for', 'بينما': 'while', 'افعل': 'do', 'توقف|اكسر': 'break',
  'استمر|تابع': 'continue', 'تبديل': 'switch', 'حالة': 'case', 'افتراضي': 'default', 'جديد': 'new', 'هذا|هذه': 'this',
  'صحيح|صح': 'true', 'خطا|غلط': 'false', 'فارغ|لاشيء': 'null', 'غير_معرف': 'undefined', 'نوع': 'typeof',
  'في': 'in', 'من': 'of', 'حاول': 'try', 'امسك|التقط': 'catch', 'اخيرا': 'finally', 'ارمي|ارم': 'throw',
  'صنف': 'class', 'يمتد': 'extends', 'منشئ': 'constructor', 'الاب': 'super', 'استيراد': 'import', 'تصدير': 'export',
  'احذف': 'delete', 'نسخة_من': 'instanceof', 'انتظر': 'await', 'غير_متزامن': 'async', 'ساكن': 'static', 'انتج': 'yield',
  'وايضا|وكذلك': '&&', 'او|أو': '||', 'ليس': '!', 'غير_محدد': 'undefined', 'مالانهاية': 'Infinity', 'لا_رقم': 'NaN',
  'عام': 'globalThis', 'دالة_جديدة': 'Function'
};
R.jsGlobals = {
  'وثيقة|مستند': 'document', 'نافذة': 'window', 'وحدة_التحكم': 'console', 'اطبع': 'console.log', 'تنبيه': 'alert',
  'تاكيد|اكد': 'confirm', 'اسال|ادخل': 'prompt', 'ضبط_مهلة|بعد_مهلة': 'setTimeout', 'ضبط_فاصل|كل_فاصل': 'setInterval',
  'الغاء_مهلة': 'clearTimeout', 'الغاء_فاصل': 'clearInterval', 'جلب': 'fetch', 'رياضيات': 'Math', 'تاريخ': 'Date',
  'مصفوفة': 'Array', 'كائن': 'Object', 'سلسلة': 'String', 'عدد': 'Number', 'منطقي': 'Boolean', 'وعد': 'Promise',
  'خريطة': 'Map', 'مجموعة': 'Set', 'تخزين_محلي': 'localStorage', 'تخزين_الجلسة': 'sessionStorage',
  'حلل_عدد_صحيح': 'parseInt', 'حلل_عدد_عشري': 'parseFloat', 'ليس_رقم': 'isNaN', 'حدث': 'event', 'متصفح': 'navigator',
  'موقع': 'location', 'تاريخ_التصفح': 'history', 'اطار_حركة': 'requestAnimationFrame'
};
R.jsMembers = {
  'عنصر_بالمعرف|احصل_عنصر_بالمعرف': 'getElementById', 'عناصر_بالفئة': 'getElementsByClassName', 'عناصر_بالوسم': 'getElementsByTagName',
  'استعلام|اختر': 'querySelector', 'استعلام_الكل|اختر_الكل': 'querySelectorAll', 'انشئ_عنصر': 'createElement',
  'انشئ_نص': 'createTextNode', 'اضف_ابن': 'appendChild', 'ازل_ابن': 'removeChild', 'اضف_قبل': 'prepend', 'اضف_بعد': 'append',
  'ازل': 'remove', 'اضف_مستمع|عند': 'addEventListener', 'ازل_مستمع': 'removeEventListener',
  'نص_داخلي': 'innerText', 'محتوى_نصي': 'textContent', 'اتش_تي_ام_ال_داخلي|html_داخلي': 'innerHTML',
  'قيمة': 'value', 'نمط': 'style', 'قائمة_الفئات': 'classList', 'اضف': 'add', 'بدل': 'toggle', 'يحتوي': 'contains',
  'طول|الطول': 'length', 'ادفع': 'push', 'اسحب': 'pop', 'انزع': 'shift', 'ادرج_بالبداية': 'unshift', 'خريطة': 'map',
  'رشح': 'filter', 'اختزل': 'reduce', 'لكل_عنصر': 'forEach', 'جد': 'find', 'جد_فهرس': 'findIndex', 'بعض': 'some',
  'كل': 'every', 'يشمل': 'includes', 'اربط': 'join', 'قسم': 'split', 'شريحة': 'slice', 'وصل': 'splice',
  'استبدل': 'replace', 'استبدل_الكل': 'replaceAll', 'فهرس': 'indexOf', 'رتب': 'sort', 'اعكس': 'reverse',
  'حروف_كبيرة': 'toUpperCase', 'حروف_صغيرة': 'toLowerCase', 'قص_الفراغات|قص': 'trim', 'يبدا_ب': 'startsWith',
  'ينتهي_ب': 'endsWith', 'سجل': 'log', 'خطا': 'error', 'تحذير': 'warn', 'معلومات': 'info', 'عشوائي': 'random',
  'ارضي|ارضية': 'floor', 'سقف': 'ceil', 'قرب': 'round', 'اكبر': 'max', 'اصغر': 'min', 'قوة': 'pow', 'جذر': 'sqrt',
  'مطلق': 'abs', 'الان': 'now', 'احصل_السنة': 'getFullYear', 'احصل_الشهر': 'getMonth', 'احصل_اليوم': 'getDate',
  'احصل_الساعة': 'getHours', 'احصل_الدقيقة': 'getMinutes', 'احصل_الثانية': 'getSeconds',
  'منع_الافتراضي': 'preventDefault', 'ايقاف_الانتشار': 'stopPropagation', 'هدف': 'target', 'ثم': 'then',
  'حول_الى_نص': 'stringify', 'حلل': 'parse', 'الى_نص': 'toString', 'الى_عدد_ثابت': 'toFixed', 'ركز': 'focus', 'انقر': 'click',
  'مصدر': 'src', 'رابط': 'href', 'معرف': 'id', 'اسم_الفئة': 'className', 'عين_خاصية': 'setAttribute',
  'احصل_خاصية': 'getAttribute', 'ازل_خاصية': 'removeAttribute', 'محدد': 'checked', 'معطل': 'disabled',
  'ابناء': 'children', 'العنصر_الاب': 'parentElement', 'العنصر_التالي': 'nextElementSibling',
  'احصل_مخزن': 'getItem', 'احفظ_مخزن': 'setItem', 'ازل_مخزن': 'removeItem', 'امسح_مخزن|امسح': 'clear',
  'مفاتيح': 'keys', 'قيم': 'values', 'مدخلات': 'entries', 'جسم': 'body', 'راس': 'head', 'عنصر_الجذر': 'documentElement',
  'مفتاح': 'key', 'رمز_المفتاح': 'code', 'ارسل': 'send', 'نص_الاستجابة': 'text', 'حالة': 'status',
  'امسك': 'catch', 'اخيرا': 'finally', 'احذف': 'delete', 'احصل': 'get', 'عين': 'set', 'يملك': 'has', 'حجم': 'size',
  'اعادة_تحميل': 'reload', 'قرب_الى': 'round',
  'لون': 'color', 'لون_الخلفية': 'backgroundColor', 'حجم_الخط': 'fontSize', 'عرض': 'width', 'ارتفاع': 'height',
  'ظهور': 'display', 'هامش': 'margin', 'حشو': 'padding', 'شفافية': 'opacity', 'خلفية': 'background', 'حدود': 'border',
  'موضع': 'position', 'يسار': 'left', 'يمين': 'right', 'اعلى': 'top', 'اسفل': 'bottom', 'تحويل': 'transform',
  'انتقال': 'transition', 'مؤشر': 'cursor', 'محاذاة_النص': 'textAlign', 'وزن_الخط': 'fontWeight',
  'استدارة_الحدود': 'borderRadius', 'ظل_الصندوق': 'boxShadow'
};
R.jsEvents = {
  'نقر': 'click', 'تغيير': 'change', 'ادخال': 'input', 'ارسال': 'submit', 'تحميل': 'load', 'تحميل_المحتوى': 'DOMContentLoaded',
  'ضغط_مفتاح': 'keydown', 'رفع_مفتاح': 'keyup', 'مرور_الماوس': 'mouseover', 'خروج_الماوس': 'mouseout',
  'تمرير': 'scroll', 'تغيير_الحجم': 'resize', 'لمس': 'touchstart', 'نقر_مزدوج': 'dblclick', 'تركيز': 'focus', 'فقدان_تركيز': 'blur'
};

/* ===== توسعة القواميس لتغطية كاملة ===== */
Object.assign(R.tags, {
  'مدخل_قائمة|قائمة_بيانات': 'datalist', 'خريطة_صورة': 'map', 'منطقة': 'area', 'عمود': 'col', 'مجموعة_اعمدة': 'colgroup',
  'عنوان_الجدول': 'caption', 'فاصل_كلمة': 'wbr', 'ناتج': 'output', 'لوحة_مفاتيح': 'kbd', 'عينة_ناتج': 'samp', 'متغير_رياضي': 'var',
  'تعريف': 'dfn', 'اقتباس_سطري': 'q', 'مرجع': 'cite', 'صورة_متعددة': 'picture', 'تضمين': 'embed', 'كائن_خارجي': 'object',
  'قائمة_تعريفات': 'dl', 'مصطلح': 'dt', 'وصف_المصطلح': 'dd', 'قائمة_اوامر': 'menu', 'عنوان_الاتصال': 'address', 'بيانات': 'data',
  'فتحة': 'slot', 'اتجاه_معاكس': 'bdi', 'تجاوز_الاتجاه': 'bdo', 'شرح_صغير': 'small', 'مجموعة_مدخلات': 'fieldset',
  'مسار': 'path', 'دائرة': 'circle', 'مستطيل': 'rect', 'خط_مستقيم': 'line', 'مضلع': 'polygon', 'خط_منكسر': 'polyline',
  'قطع_ناقص': 'ellipse', 'مجموعة_رسم': 'g', 'تعريفات': 'defs', 'تدرج_خطي': 'linearGradient', 'تدرج_دائري': 'radialGradient',
  'نقطة_توقف': 'stop', 'نص_متجه': 'text', 'استخدام': 'use', 'رمز_رسم': 'symbol', 'قناع': 'mask', 'قص_رسم': 'clipPath', 'حركة_رسم': 'animate'
});
Object.assign(R.attrs, {
  'حدود': 'border', 'حشو_الخلية': 'cellpadding', 'تباعد_الخلية': 'cellspacing', 'محاذاة': 'align', 'منطقة_العرض': 'viewBox', 'تعبئة': 'fill', 'خط_الرسم': 'stroke', 'سمك_الخط': 'stroke-width', 'مركز_س': 'cx', 'مركز_ص': 'cy',
  'نصف_قطر': 'r', 'س': 'x', 'ص': 'y', 'س1': 'x1', 'ص1': 'y1', 'س2': 'x2', 'ص2': 'y2', 'مسار_الرسم': 'd', 'نقاط': 'points',
  'مجموعة_صور': 'srcset', 'احجام': 'sizes', 'قائمة_بيانات': 'list', 'استمارة': 'form', 'ترتيب_الجدول': 'scope',
  'عنوان_الوسائط': 'media', 'اسم_الملف': 'download', 'انتقال_مرجعي': 'referrerpolicy', 'صندوق_رمل': 'sandbox',
  'سماح': 'allow', 'ملء_الشاشة': 'allowfullscreen', 'تحويل': 'transform', 'ازاحة': 'offset', 'لون_الايقونة': 'color',
  'مجموعة_اسماء': 'translate', 'تدقيق_املائي': 'spellcheck', 'ادخال_نمط': 'inputmode', 'عند_السحب': 'ondrag',
  'عند_الافلات': 'ondrop', 'عند_الحركة': 'onmousemove', 'عند_الضغط_الماوس': 'onmousedown', 'عند_رفع_الماوس': 'onmouseup',
  'عند_ضغط_مطول': 'oncontextmenu', 'عند_تغيير_الحجم': 'onresize', 'عند_الاختيار': 'onselect', 'عند_الانتهاء': 'onended',
  'عند_التشغيل': 'onplay', 'عند_الايقاف': 'onpause', 'عند_الاهمال': 'oninvalid', 'عند_لمس_الحركة': 'ontouchmove', 'عند_لمس_النهاية': 'ontouchend'
});
Object.assign(R.attrVals.type, { 'تاريخ_ووقت': 'datetime-local', 'شهر': 'month', 'اسبوع': 'week', 'نص_javascript': 'text/javascript' });
Object.assign(R.cssProps, {
  'مركز-العناصر': 'place-items', 'مركز-المحتوى': 'place-content', 'محاذاة-افقية-للعناصر': 'justify-items', 'محاذاة-افقية-ذاتية': 'justify-self',
  'فجوة-اعمدة': 'column-gap', 'فجوة-صفوف': 'row-gap', 'ازاحة-كاملة': 'inset', 'عدد-اعمدة': 'column-count', 'اعمدة-نص': 'columns',
  'التفاف-النص': 'text-wrap', 'قص-الاسطر': '-webkit-line-clamp', 'التقاط-التمرير': 'scroll-snap-type', 'محاذاة-الالتقاط': 'scroll-snap-align',
  'تمرير-مفرط': 'overscroll-behavior', 'مزج-الخلفية': 'background-blend-mode', 'مزج-العنصر': 'mix-blend-mode', 'قص-بالشكل': 'clip-path',
  'قناع-العنصر': 'mask', 'تغيير-متوقع': 'will-change', 'مظهر': 'appearance', 'لون-التمييز': 'accent-color', 'لون-المؤشر': 'caret-color',
  'حجم-التبويب': 'tab-size', 'اتجاه-الكتابة': 'writing-mode', 'عدادات': 'counter-reset', 'زيادة-عداد': 'counter-increment',
  'عزل': 'isolation', 'نوع-الحاوية': 'container-type', 'اسم-الحاوية': 'container-name', 'اطار-النص': 'text-underline-offset',
  'سمك-الزخرفة': 'text-decoration-thickness', 'لون-الزخرفة': 'text-decoration-color', 'نمط-الزخرفة': 'text-decoration-style',
  'نقطة-الاصل': 'transform-origin', 'نمط-التحويل': 'transform-style', 'منظور': 'perspective', 'اخفاء-الوجه-الخلفي': 'backface-visibility',
  'نمط-النقطة': 'list-style-type', 'موضع-القائمة': 'list-style-position', 'صورة-القائمة': 'list-style-image',
  'عرض-الخط': 'font-stretch', 'متغير-الخط': 'font-variant', 'تنعيم-الخط': '-webkit-font-smoothing', 'كسر-السطر': 'overflow-wrap',
  'ملء-الشاشة': 'inset', 'موضع-الكائن': 'object-position', 'اطار-الصورة': 'border-image', 'استدارة-علوية-يمين': 'border-top-right-radius',
  'استدارة-علوية-يسار': 'border-top-left-radius', 'استدارة-سفلية-يمين': 'border-bottom-right-radius', 'استدارة-سفلية-يسار': 'border-bottom-left-radius',
  'ازاحة-الحدود': 'outline-offset', 'لون-المخطط': 'outline-color', 'سمك-المخطط': 'outline-width', 'نمط-المخطط': 'outline-style',
  'تعبئة-الرسم': 'fill', 'سمك-الرسم': 'stroke-width', 'لون-الرسم': 'stroke', 'شفافية-التعبئة': 'fill-opacity',
  'مدة-الانتقال-الزمنية': 'transition-timing-function', 'حالة-الحركة': 'animation-play-state', 'تعبئة-الحركة': 'animation-fill-mode'
});
Object.assign(R.cssVals, {
  'تحت': 'bottom', 'مركز': 'center', 'نهاية_السطر': 'end', 'بداية_السطر': 'start', 'اساس': 'baseline', 'متساوي': 'space-evenly',
  'اتجاه_افقي': 'x', 'اطار_بالنقاط': 'dotted', 'حد_اخدود': 'groove', 'حد_بارز': 'ridge', 'ملصق': 'sticky',
  'اقتطاع': 'ellipsis', 'اخفاء_الفائض': 'hidden', 'تمرير_تلقائي': 'auto', 'كلمة_كاملة': 'break-all', 'كسر_عند_الحاجة': 'break-word',
  'محافظ': 'pre', 'محافظ_مع_التفاف': 'pre-wrap', 'وضوح': 'crisp-edges', 'ناعم': 'smooth', 'فوري': 'instant',
  'كبير': 'large', 'صغير': 'small', 'اكبر': 'larger', 'اصغر': 'smaller', 'متوسط': 'medium', 'اساسي': 'initial', 'غير_مضبوط': 'unset',
  'اقصى_محتوى': 'max-content', 'ادنى_محتوى': 'min-content', 'ملائم': 'fit-content', 'دائرة': 'circle', 'مربع': 'square',
  'قرص': 'disc', 'ارقام': 'decimal', 'مضاعف': 'multiply', 'شاشة': 'screen', 'تراكب': 'overlay', 'اضافة': 'plus-lighter',
  'مرتفع': 'zoom-in', 'تصغير_مؤشر': 'zoom-out', 'امساك': 'grab', 'ممسوك': 'grabbing', 'انتظار': 'wait', 'تحميل_مؤشر': 'progress',
  'اخفاء': 'hidden', 'قابل_للتعديل': 'text', 'كل': 'all', 'مصطف': 'stretch', 'مسافة': 'space'
});
Object.assign(R.cssFuncs, {
  'الوان': 'rgb', 'الوان-شفافة': 'rgba', 'درجة-لون': 'hsl', 'درجة-لون-شفافة': 'hsla', 'تدرج-خطي-مكرر': 'repeating-linear-gradient',
  'تدوير-س': 'rotateX', 'تدوير-ص': 'rotateY', 'تدوير-ع': 'rotateZ', 'تكبير-س': 'scaleX', 'تكبير-ص': 'scaleY', 'ازاحة-ع': 'translateZ',
  'منظور': 'perspective', 'مضلع': 'polygon', 'دائرة': 'circle', 'قطع': 'ellipse', 'احاطة': 'inset', 'تعتيم': 'brightness',
  'تدرج-رمادي': 'grayscale', 'تدوير-لون': 'hue-rotate', 'عكس': 'invert', 'تشبع': 'saturate', 'سبيا': 'sepia', 'ظل-منسدل': 'drop-shadow',
  'استخدام-متغير': 'var', 'عدّاد': 'counter', 'قيمة-الخاصية': 'attr', 'منحنى-مكعب': 'cubic-bezier', 'خطوات': 'steps',
  'تكيف': 'fit-content', 'ازاحة-س-ص': 'translate3d'
});
Object.assign(R.cssPseudo, {
  'ابن-واحد': 'only-child', 'نوع-رقم': 'nth-of-type', 'اخر-ابن-رقم': 'nth-last-child', 'قابل-للقراءة': 'read-only', 'صالح': 'valid',
  'غير-صالح': 'invalid', 'ضمن-المدى': 'in-range', 'خارج-المدى': 'out-of-range', 'اختياري': 'optional', 'تمرير-او-تركيز': 'focus-visible',
  'رابط': 'link', 'علامة': 'marker', 'خلفية-الخلفية': 'backdrop', 'افتراضي': 'default', 'ليس-اول': 'not', 'مضيف': 'host'
});
Object.assign(R.cssAt, { 'خصائص': 'property', 'نطاق': 'scope', 'بدء': 'starting-style', 'مساحة-الاسماء': 'namespace' });
Object.assign(R.jsGlobals, {
  'جيسون': 'JSON', 'تعبير_منتظم': 'RegExp', 'خطا_عام': 'Error', 'رمز': 'Symbol', 'لوحة_مفاتيح': 'KeyboardEvent',
  'عنصر_html': 'HTMLElement', 'مراقب_التغيير': 'MutationObserver', 'مراقب_التقاطع': 'IntersectionObserver', 'نموذج_بيانات': 'FormData',
  'قارئ_ملفات': 'FileReader', 'ملف_بيانات': 'Blob', 'رابط_ويب': 'URL', 'معاملات_البحث': 'URLSearchParams', 'ذاكرة_مؤقتة': 'caches',
  'قاعدة_بيانات_مفهرسة': 'indexedDB', 'مؤقت_الاداء': 'performance', 'عامل_ويب': 'Worker', 'اتصال_ويب': 'WebSocket', 'مصدر_احداث': 'EventSource',
  'ترميز_نص': 'TextEncoder', 'فك_ترميز_نص': 'TextDecoder', 'شاشة': 'screen', 'اخفاء_رابط': 'encodeURIComponent', 'فك_رابط': 'decodeURIComponent',
  'عدد_نهائي': 'isFinite', 'ليس_عدد_صحيح': 'Number.isInteger', 'تخزين_مؤقت': 'structuredClone', 'ارسال_اشارة': 'AbortController',
  'مصفوفة_بايتات': 'Uint8Array', 'مصفوفة_اعداد': 'Float64Array', 'ذاكرة_مشتركة': 'ArrayBuffer', 'ملف': 'File', 'حدث_مخصص': 'CustomEvent',
  'اضف_في_الانتظار': 'queueMicrotask', 'اطلب_اطار': 'requestAnimationFrame', 'الغاء_اطار': 'cancelAnimationFrame', 'اطلب_خمول': 'requestIdleCallback',
  'افتح_نافذة': 'open', 'اغلق_نافذة': 'close', 'مرر_الى': 'scrollTo', 'طباعة_صفحة': 'print', 'الحافظة': 'navigator.clipboard',
  'صوت_جديد': 'Audio', 'صورة_جديدة': 'Image', 'محلل_dom': 'DOMParser', 'مسلسل_dom': 'XMLSerializer', 'ارسال_رسالة': 'postMessage'
});
Object.assign(R.jsMembers, {
  'اضف_صنف': 'classList.add', 'بدل_صنف': 'classList.toggle', 'ازل_صنف': 'classList.remove',
  'عناصر_بالاسم': 'getElementsByName', 'اقرب': 'closest', 'يطابق': 'matches', 'نسخ_عنصر': 'cloneNode', 'استبدل_عنصر': 'replaceWith',
  'اضف_قبل_عنصر': 'before', 'اضف_بعد_عنصر': 'after', 'ادرج_html': 'insertAdjacentHTML', 'ادرج_قبل': 'insertBefore', 'استبدل_ابن': 'replaceChild',
  'عنصر_اول_ابن': 'firstElementChild', 'عنصر_اخر_ابن': 'lastElementChild', 'العنصر_السابق': 'previousElementSibling', 'العقد_الابناء': 'childNodes',
  'خصائص_العنصر': 'attributes', 'مجموعة_البيانات': 'dataset', 'عرض_العنصر': 'offsetWidth', 'ارتفاع_العنصر': 'offsetHeight',
  'عرض_المحتوى': 'clientWidth', 'ارتفاع_المحتوى': 'clientHeight', 'موضع_التمرير': 'scrollTop', 'موضع_التمرير_افقي': 'scrollLeft',
  'ارتفاع_التمرير': 'scrollHeight', 'مستطيل_العنصر': 'getBoundingClientRect', 'مرر_للعنصر': 'scrollIntoView', 'اخفاء_تلقائي': 'hidden',
  'اتجاه_العنصر': 'dir', 'لغة_العنصر': 'lang', 'عنوان_العنصر': 'title', 'نوع_الادخال': 'type', 'نص_توضيحي': 'placeholder',
  'ملفات': 'files', 'خيارات': 'options', 'الخيار_المختار': 'selectedIndex', 'ارسال_النموذج': 'submit', 'اعادة_ضبط_النموذج': 'reset',
  'تحقق_صلاحية': 'checkValidity', 'عناصر_النموذج': 'elements', 'شغل': 'play', 'ايقاف_مؤقت': 'pause', 'الوقت_الحالي': 'currentTime', 'المدة': 'duration',
  'لوحة_رسم_2d': 'getContext', 'امسح_مستطيل': 'clearRect', 'املأ_مستطيل': 'fillRect', 'ارسم_مستطيل': 'strokeRect', 'ابدأ_مسار': 'beginPath',
  'انقل_الى': 'moveTo', 'خط_الى': 'lineTo', 'ارسم_قوس': 'arc', 'املأ': 'fill', 'ارسم': 'stroke', 'اغلق_مسار': 'closePath', 'احفظ_حالة': 'save',
  'استعد_حالة': 'restore', 'ارسم_صورة': 'drawImage', 'املأ_نص': 'fillText', 'لون_التعبئة': 'fillStyle', 'لون_الرسم': 'strokeStyle',
  'سمك_الرسم': 'lineWidth', 'خط_النص': 'font', 'ادر': 'rotate', 'حجم_الرسم': 'scale', 'انقل': 'translate',
  'عدد_العناصر': 'length', 'ضم': 'concat', 'سطح': 'flat', 'خريطة_مسطحة': 'flatMap', 'ملء': 'fill', 'اخر_فهرس': 'lastIndexOf', 'جد_اخر': 'findLast',
  'عنصر_عند': 'at', 'من_مصفوفة': 'from', 'هل_مصفوفة': 'isArray', 'من_مدخلات': 'fromEntries', 'ادمج': 'assign', 'جمد': 'freeze',
  'اسماء_الخصائص': 'getOwnPropertyNames', 'يملك_خاصية': 'hasOwnProperty', 'عرف_خاصية': 'defineProperty', 'اطار_بالحشو': 'padStart', 'حشو_نهاية': 'padEnd',
  'كرر': 'repeat', 'حرف_عند': 'charAt', 'رمز_الحرف': 'charCodeAt', 'من_رمز': 'fromCharCode', 'ابحث': 'search', 'طابق': 'match', 'طابق_الكل': 'matchAll',
  'اختبر': 'test', 'نفذ': 'exec', 'قارن_محليا': 'localeCompare', 'الى_نص_محلي': 'toLocaleString', 'قص_البداية': 'trimStart', 'قص_النهاية': 'trimEnd',
  'مقطع': 'substring', 'جزء': 'substr', 'تطبيع': 'normalize', 'هل_صحيح': 'isInteger', 'هل_منتهي': 'isFinite', 'هل_عدد_امن': 'isSafeInteger',
  'الى_دقة': 'toPrecision', 'اس': 'exp', 'لوغاريتم': 'log', 'جيب': 'sin', 'جيب_تمام': 'cos', 'ظل_زاوية': 'tan', 'قطع_ناقص_رياضي': 'hypot',
  'اشارة': 'sign', 'بتر': 'trunc', 'باي': 'PI', 'ثابت_اويلر': 'E', 'اكبر_عدد': 'MAX_SAFE_INTEGER', 'حل': 'resolve', 'ارفض': 'reject',
  'الكل': 'all', 'الاسرع': 'race', 'الكل_منتهي': 'allSettled', 'الى_جيسون': 'json', 'نص_الجسم': 'body', 'رؤوس': 'headers', 'سلامة': 'ok',
  'الحالة_النصية': 'statusText', 'نسخة': 'clone', 'احصل_الوقت': 'getTime', 'احصل_اليوم_الاسبوع': 'getDay', 'عين_السنة': 'setFullYear',
  'الى_نص_iso': 'toISOString', 'الى_تاريخ_محلي': 'toLocaleDateString', 'الى_وقت_محلي': 'toLocaleTimeString', 'الى_تنسيق': 'toLocaleString',
  'استدعي': 'call', 'طبق': 'apply', 'اربط_هذا': 'bind', 'اضف_عنصر': 'add', 'يحوي': 'has', 'احذف_عنصر': 'delete', 'للكل': 'forEach',
  'احفظ_في': 'setItem', 'اقرأ_من': 'getItem', 'مفتاح_عند': 'key', 'نص_من_الحافظة': 'readText', 'اكتب_نص_للحافظة': 'writeText',
  'ارجع_للخلف': 'back', 'تقدم_للامام': 'forward', 'اذهب': 'go', 'استبدل_الموقع': 'assign', 'اسم_النطاق': 'hostname', 'مسار_الصفحة': 'pathname',
  'نص_البحث': 'search', 'علامة_الصفحة': 'hash', 'اللغة': 'language', 'متصل': 'onLine', 'موقع_جغرافي': 'geolocation', 'احصل_الموقع': 'getCurrentPosition',
  'عرض_الشاشة': 'innerWidth', 'ارتفاع_الشاشة': 'innerHeight', 'مرر': 'scrollBy', 'مرر_الى_موضع': 'scrollTo', 'اطبع_صفحة': 'print',
  'ضبط_مهلة_عرض': 'requestAnimationFrame', 'جدول': 'table', 'مجموعة_سجل': 'group', 'نهاية_مجموعة': 'groupEnd', 'عد': 'count', 'وقت_بداية': 'time', 'وقت_نهاية': 'timeEnd',
  'تاكد': 'assert', 'اثر': 'trace', 'رسالة': 'message', 'مكدس': 'stack', 'اسم_الخطا': 'name', 'السبب': 'cause'
});
/* ===== إكمال HTML5 بالكامل: كل وسم وخاصية وحدث ===== */
Object.assign(R.tags, { 'مجموعة_عناوين': 'hgroup', 'معامل_كائن': 'param', 'قوس_روبي': 'rp', 'نطق_روبي': 'rt', 'روبي': 'ruby', 'مشطوب': 's', 'بحث_منطقة': 'search' });
Object.assign(R.attrs, {
  'ترميز_القبول': 'accept-charset', 'مفتاح_الوصول': 'accesskey', 'احرف_كبيرة_تلقائية': 'autocapitalize', 'مصدر_الاقتباس': 'cite',
  'احداثيات': 'coords', 'اصل_متقاطع': 'crossorigin', 'بيانات_الكائن': 'data', 'تاريخ_ووقت_قيمة': 'datetime', 'فك_الترميز': 'decoding',
  'افتراضي_المسار': 'default', 'اسم_الاتجاه': 'dirname', 'نوع_الترميز': 'enctype', 'تلميح_الادخال': 'enterkeyhint', 'اجراء_الزر': 'formaction',
  'رؤوس_الخلية': 'headers', 'قيمة_عليا': 'high', 'لغة_الرابط': 'hreflang', 'مكافئ_http': 'http-equiv', 'خامل': 'inert', 'سلامة_المصدر': 'integrity',
  'عنصر_مخصص': 'is', 'خريطة_خادم': 'ismap', 'خاصية_العنصر': 'itemprop', 'نوع_المسار': 'kind', 'عنوان_الخيار': 'label', 'قيمة_دنيا': 'low',
  'بدون_وحدة': 'nomodule', 'رقم_مرة_واحدة': 'nonce', 'بدون_تحقق': 'novalidate', 'قيمة_مثلى': 'optimum', 'تتبع': 'ping', 'تشغيل_داخلي': 'playsinline',
  'تحميل_مسبق': 'preload', 'معكوس': 'reversed', 'شكل_المنطقة': 'shape', 'فتحة_اسم': 'slot', 'امتداد': 'span', 'مستند_مضمن': 'srcdoc',
  'لغة_المصدر': 'srclang', 'بداية_القائمة': 'start', 'استخدم_خريطة': 'usemap', 'التفاف_النص': 'wrap', 'منبثق': 'popover',
  'هدف_المنبثق': 'popovertarget', 'اولوية_الجلب': 'fetchpriority',
  'عند_الاجهاض': 'onabort', 'عند_بعد_الطباعة': 'onafterprint', 'عند_قبل_الطباعة': 'onbeforeprint', 'عند_قبل_المغادرة': 'onbeforeunload',
  'عند_امكانية_التشغيل': 'oncanplay', 'عند_تشغيل_كامل': 'oncanplaythrough', 'عند_النسخ': 'oncopy', 'عند_القص': 'oncut',
  'عند_انتهاء_السحب': 'ondragend', 'عند_دخول_السحب': 'ondragenter', 'عند_خروج_السحب': 'ondragleave', 'عند_السحب_فوق': 'ondragover',
  'عند_بدء_السحب': 'ondragstart', 'عند_تغير_المدة': 'ondurationchange', 'عند_الافراغ': 'onemptied', 'عند_دخول_التركيز': 'onfocusin',
  'عند_خروج_التركيز': 'onfocusout', 'عند_بيانات_النموذج': 'onformdata', 'عند_تغير_الهاش': 'onhashchange', 'عند_كتابة_مفتاح': 'onkeypress',
  'عند_تحميل_البيانات': 'onloadeddata', 'عند_تحميل_الوصف': 'onloadedmetadata', 'عند_بدء_التحميل': 'onloadstart', 'عند_رسالة': 'onmessage',
  'عند_دخول_الماوس': 'onmouseenter', 'عند_مغادرة_الماوس': 'onmouseleave', 'عند_انقطاع_الاتصال': 'onoffline', 'عند_عودة_الاتصال': 'ononline',
  'عند_اخفاء_الصفحة': 'onpagehide', 'عند_اظهار_الصفحة': 'onpageshow', 'عند_اللصق': 'onpaste', 'عند_جاري_التشغيل': 'onplaying',
  'عند_الغاء_المؤشر': 'onpointercancel', 'عند_ضغط_المؤشر': 'onpointerdown', 'عند_دخول_المؤشر': 'onpointerenter', 'عند_مغادرة_المؤشر': 'onpointerleave',
  'عند_حركة_المؤشر': 'onpointermove', 'عند_خروج_المؤشر': 'onpointerout', 'عند_فوق_المؤشر': 'onpointerover', 'عند_رفع_المؤشر': 'onpointerup',
  'عند_رجوع_السجل': 'onpopstate', 'عند_التقدم': 'onprogress', 'عند_تغير_السرعة': 'onratechange', 'عند_اعادة_الضبط': 'onreset',
  'عند_البحث': 'onsearch', 'عند_انتهاء_التنقل': 'onseeked', 'عند_التنقل': 'onseeking', 'عند_التعطل': 'onstalled', 'عند_تغير_التخزين': 'onstorage',
  'عند_التعليق': 'onsuspend', 'عند_تحديث_الوقت': 'ontimeupdate', 'عند_التبديل': 'ontoggle', 'عند_الغاء_اللمس': 'ontouchcancel',
  'عند_المغادرة': 'onunload', 'عند_تغير_الصوت': 'onvolumechange', 'عند_الانتظار': 'onwaiting', 'عند_العجلة': 'onwheel'
});
Object.assign(R.jsEvents, {
  'نسخ': 'copy', 'قص': 'cut', 'لصق': 'paste', 'عجلة': 'wheel', 'ضغط_المؤشر': 'pointerdown', 'رفع_المؤشر': 'pointerup', 'حركة_المؤشر': 'pointermove',
  'دخول_الماوس': 'mouseenter', 'مغادرة_الماوس': 'mouseleave', 'حركة_الماوس': 'mousemove', 'ضغط_الماوس': 'mousedown', 'رفع_الماوس': 'mouseup',
  'سحب': 'drag', 'بدء_السحب': 'dragstart', 'انتهاء_السحب': 'dragend', 'السحب_فوق': 'dragover', 'افلات': 'drop', 'اعادة_ضبط': 'reset',
  'انتهاء': 'ended', 'تشغيل': 'play', 'ايقاف_مؤقت': 'pause', 'تقدم': 'progress', 'تحديث_الوقت': 'timeupdate', 'تغير_الهاش': 'hashchange',
  'رجوع_السجل': 'popstate', 'رسالة': 'message', 'اتصال': 'online', 'انقطاع': 'offline', 'خطا': 'error', 'عرض_الصفحة': 'pageshow',
  'اخفاء_الصفحة': 'pagehide', 'تحميل_البيانات': 'loadeddata', 'لمس_حركة': 'touchmove', 'لمس_نهاية': 'touchend', 'لمس_الغاء': 'touchcancel',
  'كتابة_مفتاح': 'keypress', 'تغير_التخزين': 'storage', 'قبل_المغادرة': 'beforeunload', 'اختيار': 'select', 'ضغط_مطول': 'contextmenu',
  'دخول_التركيز': 'focusin', 'خروج_التركيز': 'focusout', 'بدء_التحميل': 'loadstart', 'تبديل': 'toggle', 'ادخال_نص': 'input'
});
Object.assign(R.attrVals, {
  autocomplete: { 'تشغيل': 'on', 'ايقاف': 'off', 'اسم_مستخدم': 'username', 'كلمة_مرور_جديدة': 'new-password', 'كلمة_مرور_حالية': 'current-password' },
  preload: { 'بيانات_وصفية': 'metadata', 'لا_شيء': 'none', 'تلقائي': 'auto' },
  crossorigin: { 'مجهول': 'anonymous', 'مع_بيانات_اعتماد': 'use-credentials' },
  enctype: { 'بيانات_متعددة': 'multipart/form-data', 'نص_عادي': 'text/plain' },
  align: { 'وسط': 'center', 'يمين': 'right', 'يسار': 'left' },
  scope: { 'صف': 'row', 'عمود': 'col' },
  contenteditable: { 'صحيح': 'true', 'خطا': 'false' },
  draggable: { 'صحيح': 'true', 'خطا': 'false' },
  spellcheck: { 'صحيح': 'true', 'خطا': 'false' },
  inputmode: { 'رقمي': 'numeric', 'هاتف': 'tel', 'بريد': 'email', 'نص': 'text', 'رابط_ويب': 'url', 'عشري': 'decimal', 'بحث': 'search' },
  shape: { 'دائرة': 'circle', 'مستطيل': 'rect', 'مضلع': 'poly' },
  kind: { 'ترجمة': 'captions', 'عناوين_فرعية': 'subtitles', 'وصف': 'descriptions', 'فصول': 'chapters' },
  wrap: { 'ناعم': 'soft', 'صارم': 'hard' },
  decoding: { 'غير_متزامن': 'async', 'متزامن': 'sync', 'تلقائي': 'auto' },
  popover: { 'تلقائي': 'auto', 'يدوي': 'manual' },
  'http-equiv': { 'تحديث': 'refresh', 'سياسة_المحتوى': 'content-security-policy' }
});
Object.assign(R.attrVals.rel, { 'تحميل_مسبق': 'preload', 'اتصال_مسبق': 'preconnect', 'جلب_مسبق': 'prefetch', 'بديل': 'alternate', 'بدون_متابعة': 'nofollow', 'بدون_مرجع': 'noreferrer', 'بدون_فتح': 'noopener', 'بيان': 'manifest' });
let TAGS = mk(R.tags), ATTRS = mk(R.attrs);
let ATTRVALS = {}; Object.keys(R.attrVals).forEach(k => ATTRVALS[k] = mk(R.attrVals[k]));
let PROPS = mk(R.cssProps);
let VALS = mk(Object.assign({}, R.cssVals, R.colors));
let FUNCS = mk(R.cssFuncs), UNITS = mk(R.cssUnits), PSEUDO = mk(R.cssPseudo), ATS = mk(R.cssAt);
let MEDIA = mk(R.cssMedia);
let JSKW = mk(R.jsKw), JSG = mk(R.jsGlobals), JSM = mk(R.jsMembers), JSEV = mk(R.jsEvents);
let SELTAGS = mk(Object.assign({ 'من': 'from', 'الى': 'to' }, R.tags));
/* ===== القواميس المعكوسة (إنجليزي -> عربي) ===== */
function inv(o, exact) {
  const m = new Map();
  Object.keys(o).forEach(k => { const en = o[k]; const key = exact ? en : norm(en); if (!m.has(key)) m.set(key, k.split('|')[0]); });
  return m;
}
const FWD = { TAGS, ATTRS, ATTRVALS, PROPS, VALS, FUNCS, UNITS, PSEUDO, ATS, MEDIA, JSKW, JSG, JSM, JSEV, SELTAGS };
const REVM = {
  TAGS: inv(R.tags), ATTRS: inv(R.attrs), ATTRVALS: {}, PROPS: inv(R.cssProps), VALS: inv(Object.assign({}, R.cssVals, R.colors)),
  FUNCS: inv(R.cssFuncs), UNITS: inv(R.cssUnits), PSEUDO: inv(R.cssPseudo), ATS: inv(R.cssAt), MEDIA: inv(R.cssMedia),
  JSKW: inv(R.jsKw, true), JSG: inv(R.jsGlobals, true), JSM: inv(R.jsMembers, true), JSEV: inv(R.jsEvents, true),
  SELTAGS: inv(Object.assign({ 'من': 'from', 'الى': 'to' }, R.tags))
};
Object.keys(R.attrVals).forEach(k => REVM.ATTRVALS[k] = inv(R.attrVals[k]));
let REV = false;
function setDir(rev) {
  const S_ = rev ? REVM : FWD;
  TAGS = S_.TAGS; ATTRS = S_.ATTRS; ATTRVALS = S_.ATTRVALS; PROPS = S_.PROPS; VALS = S_.VALS; FUNCS = S_.FUNCS; UNITS = S_.UNITS;
  PSEUDO = S_.PSEUDO; ATS = S_.ATS; MEDIA = S_.MEDIA; JSKW = S_.JSKW; JSG = S_.JSG; JSM = S_.JSM; JSEV = S_.JSEV; SELTAGS = S_.SELTAGS;
  REV = rev;
}
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const EN_TAGS = new Set(Object.values(R.tags));
const EN_ATTRS = new Set(Object.values(R.attrs));
const EN_KW = new Set('const let var function return if else for while do break continue switch case default new this true false null undefined typeof in of try catch finally throw class extends super import export delete instanceof await async static yield'.split(' '));
const EN_GL = new Set('document window console alert confirm prompt setTimeout setInterval fetch Math Date Array Object String Number Boolean Promise Map Set localStorage sessionStorage JSON parseInt parseFloat isNaN event navigator location history'.split(' '));

function tagEn(name) { const v = TAGS.get(norm(name)); return v || name; }
function attrEn(name) {
  const n = norm(name);
  const v = ATTRS.get(n);
  if (v) return v;
  if (REV) {
    if (/^data-/i.test(name)) return 'بيانات-' + name.slice(5);
    if (/^aria-/i.test(name)) return 'وصول-' + name.slice(5);
    return name;
  }
  if (n.startsWith('بيانات-')) return 'data-' + name.slice(7);
  if (n.startsWith('وصول-')) return 'aria-' + name.slice(5);
  return name;
}

/* ============ تصحيح علامات الترقيم العربية ============ */
function fixPunct(src, js) {
  if (REV) return src;
  const re = js
    ? /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)/
    : /(\/\*[\s\S]*?\*\/|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')/;
  return src.split(re).map((p, i) => i % 2 ? p :
    p.replace(/،/g, ',').replace(/؛/g, ';').replace(/؟/g, '?').replace(/٪/g, '%')
      .replace(/(?<![\u0600-\u06FF\w$])[٠-٩]+(?:\.[٠-٩]+)?/g, d2a)).join('');
}

/* ============ تحويل JavaScript ============ */
const JID = /[\u0600-\u06FF$A-Za-z_][\u0600-\u06FF$\w]*/y;
const SEL_CALL = /\.(querySelector(All)?|closest|matches)\s*\(\s*$/;
const TAG_CALL = /(createElement|getElementsByTagName)\s*\(\s*$/;
const ATTR_CALL = /(set|get|remove|has)Attribute\s*\(\s*$/;
const REGEX_PREV = /(^|[=(,:;{}\[!&|?+\-*%<>~^]|\breturn|\btypeof|\bcase|\bin|\bof)\s*$/;
// \u0623\u0633\u0645\u0627\u0621 \u0639\u0631\u0651\u0641\u0647\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0646\u0641\u0633\u0647: \u062A\u0628\u0642\u0649 \u0643\u0645\u0627 \u0647\u064A \u0648\u0644\u0627 \u062A\u062A\u062D\u0648\u0644
function userNames(s) {
  const set = new Set();
  const decl = /(?:^|[^\u0600-\u06FF$\w])(\u062B\u0627\u0628\u062A|\u0645\u062A\u063A\u064A\u0631|\u0645\u062A\u063A\u064A\u0631_\u0642\u062F\u064A\u0645|\u0645\u062A\u063A\u064A\u0631_\u0639\u0627\u0645|\u062F\u0627\u0644\u0629|\u0648\u0638\u064A\u0641\u0629|\u0635\u0646\u0641|const|let|var|function|class)\s+([\u0600-\u06FF$A-Za-z_][\u0600-\u06FF$\w]*)/g;
  let m;
  while ((m = decl.exec(s))) set.add(norm(m[2]));
  const params = /(?:\u062F\u0627\u0644\u0629|\u0648\u0638\u064A\u0641\u0629|function)\s*[\u0600-\u06FF$\w]*\s*\(([^)]*)\)|\(([^()]*)\)\s*=>|([\u0600-\u06FF$\w]+)\s*=>/g;
  while ((m = params.exec(s))) {
    (m[1] || m[2] || m[3] || '').split(',').forEach(p => {
      const nm = /^\s*(?:\.\.\.)?\s*([\u0600-\u06FF$A-Za-z_][\u0600-\u06FF$\w]*)/.exec(p);
      if (nm) set.add(norm(nm[1]));
    });
  }
  set.props = new Set();
  const th = /(?:\u0647\u0630\u0627|\u0647\u0630\u0647|this)\.([\u0600-\u06FF$A-Za-z_][\u0600-\u06FF$\w]*)\s*=(?!=)/g;
  while ((m = th.exec(s))) set.props.add(norm(m[1]));
  const cat = /(?:\u0627\u0645\u0633\u0643|\u0627\u0644\u062A\u0642\u0637|catch)\s*\(\s*([\u0600-\u06FF$A-Za-z_][\u0600-\u06FF$\w]*)/g;
  while ((m = cat.exec(s))) set.add(norm(m[1]));
  ['\u0645\u0646', '\u0641\u064A', '\u0646\u0648\u0639', '\u062C\u062F\u064A\u062F', '\u0647\u0630\u0627', '\u0647\u0630\u0647'].forEach(k => set.delete(norm(k)));
  JSKW.forEach((v, k) => { if (/^(const|let|var|function|class|if|else|for|while|do|return|new|this|typeof|in|of|try|catch|throw|break|continue|switch|case|default|delete|await|async|import|export|extends|super|static|yield|instanceof|constructor)$/.test(v)) set.delete(k); });
  return set;
}
function jsConv(s, owned) {
  owned = owned || userNames(s);
  const stack = []; let pendingClass = false;
  let out = '', i = 0;
  const n = s.length;
  while (i < n) {
    const c = s[i], d = s[i + 1];
    if (c === '\u201C' || c === '\u2018') {
      const close = c === '\u201C' ? '\u201D' : '\u2019', q = c === '\u201C' ? '"' : "'";
      let j = s.indexOf(close, i + 1); if (j < 0) j = n;
      out += q + s.slice(i + 1, j).split(q).join('\\' + q) + q; i = j + 1; continue;
    }
    if (c === '/' && d !== '/' && d !== '*' && REGEX_PREV.test(out.slice(-14))) {
      let j = i + 1, cls = false;
      while (j < n && s[j] !== '\n') {
        if (s[j] === '\\') { j += 2; continue; }
        if (s[j] === '[') cls = true; else if (s[j] === ']') cls = false;
        else if (s[j] === '/' && !cls) break;
        j++;
      }
      if (s[j] === '/') { j++; while (j < n && /[a-z]/i.test(s[j])) j++; out += s.slice(i, j); i = j; continue; }
    }
    if (c === '/' && d === '/') { let j = s.indexOf('\n', i); if (j < 0) j = n; out += s.slice(i, j); i = j; continue; }
    if (c === '/' && d === '*') { let j = s.indexOf('*/', i + 2); j = j < 0 ? n : j + 2; out += s.slice(i, j); i = j; continue; }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && s[j] !== c && s[j] !== '\n') { if (s[j] === '\\') j++; j++; }
      let str = s.slice(i, j + 1);
      const tail = REV ? s.slice(Math.max(0, i - 48), i) : out.slice(-48), inner = str.slice(1, -1);
      if (/(addEventListener|removeEventListener)\s*\(\s*$/.test(tail)) {
        const ev = JSEV.get(REV ? inner : norm(inner));
        if (ev) str = c + ev + c;
      } else if (SEL_CALL.test(tail)) {
        str = c + convSelector(inner) + c;
      } else if (TAG_CALL.test(tail)) {
        str = c + tagEn(inner) + c;
      } else if (ATTR_CALL.test(tail)) {
        str = c + attrEn(inner) + c;
      }
      out += str; i = j + 1; continue;
    }
    if (c === '`') {
      out += '`'; i++;
      while (i < n && s[i] !== '`') {
        if (s[i] === '\\') { out += s.slice(i, i + 2); i += 2; continue; }
        if (s[i] === '$' && s[i + 1] === '{') {
          let depth = 1, j = i + 2;
          while (j < n && depth) { if (s[j] === '{') depth++; else if (s[j] === '}') depth--; j++; }
          out += '${' + jsConv(s.slice(i + 2, j - 1), owned) + '}'; i = j; continue;
        }
        out += s[i++];
      }
      out += '`'; i++; continue;
    }
    if (c >= '0' && c <= '9') {
      const m = /[0-9][\w.]*/y; m.lastIndex = i; const r = m.exec(s);
      out += r[0]; i += r[0].length; continue;
    }
    JID.lastIndex = i;
    const m = JID.exec(s);
    if (m) {
      const w = m[0], nk = norm(w), key = REV ? w : nk;
      let k = i - 1; while (k >= 0 && /\s/.test(s[k])) k--;
      const prev = k >= 0 ? s[k] : '';
      let e = i + w.length; while (e < n && /[ \t]/.test(s[e])) e++;
      const next = e < n ? s[e] : '';
      let rep = w;
      const mine = owned.has(nk), myProp = owned.props && owned.props.has(nk);
      if (prev === '.' && s[k - 1] !== '.') {
        rep = myProp ? w : (JSM.get(key) || w);
      } else if ((prev === '{' || prev === ',') && next === ':' && key !== 'افتراضي') {
        rep = myProp ? w : (JSM.get(key) || w);
      } else if (mine) {
        rep = w;
      } else {
        rep = JSKW.get(key) || JSG.get(key) || w;
      }
      if (rep === 'class' && !(prev === '.')) pendingClass = true;
      if (rep === 'function' && stack[stack.length - 1] === 'class' && !mine) {
        i += w.length; while (i < n && /[ \t]/.test(s[i])) i++; continue;
      }
      out += rep; i += w.length; continue;
    }
    if (c === '{') { stack.push(pendingClass ? 'class' : 'b'); pendingClass = false; }
    else if (c === '}') stack.pop();
    out += c; i++;
  }
  return out;
}
function convJS(src) { return jsConv(fixPunct(src, true)); }

/* ============ تحويل CSS ============ */
function convValue(v, extra) {
  let out = '', i = 0;
  const n = v.length;
  while (i < n) {
    const c = v[i];
    if (c === '"' || c === "'") {
      let j = i + 1; while (j < n && v[j] !== c) { if (v[j] === '\\') j++; j++; }
      out += v.slice(i, j + 1); i = j + 1; continue;
    }
    if (c === '“' || c === '‘') {
      const cl = c === '“' ? '”' : '’', q = c === '“' ? '"' : "'";
      let j = v.indexOf(cl, i + 1); if (j < 0) j = n;
      out += q + v.slice(i + 1, j) + q; i = j + 1; continue;
    }
    if (c === '#') {
      const m = /#[0-9a-zA-Z]*/y; m.lastIndex = i; const r = m.exec(v);
      out += r[0]; i += r[0].length; continue;
    }
    if (c === '!') {
      const m = /!\s*(مهم|important)/y; m.lastIndex = i; const r = m.exec(v);
      if (r) { out += REV ? '!مهم' : '!important'; i += r[0].length; continue; }
    }
    if (/[0-9.]/.test(c) && /[0-9]/.test(c === '.' ? (v[i + 1] || '') : c)) {
      const m = /([0-9]*\.?[0-9]+)(\s*)([\u0600-\u06FFA-Za-z%_]+)?/y; m.lastIndex = i;
      const r = m.exec(v);
      if (r[3]) {
        const u = UNITS.get(norm(r[3]));
        if (u) { out += r[1] + u; i += r[0].length; continue; }
        if (r[2] === '') { out += r[0]; i += r[0].length; continue; }
        out += r[1]; i += r[1].length; continue;
      }
      out += r[1]; i += r[1].length; continue;
    }
    if (/[\u0600-\u06FFA-Za-z_]/.test(c) || (c === '-' && /[\u0600-\u06FFA-Za-z_-]/.test(v[i + 1] || ''))) {
      const m = /-{0,2}[\u0600-\u06FFA-Za-z_][\u0600-\u06FF\w-]*/y; m.lastIndex = i;
      const r = m.exec(v);
      if (!r) { out += c; i++; continue; }
      const w = r[0], key = norm(w);
      i += w.length;
      if (w.startsWith('--')) { out += w; continue; }
      if (v[i] === '(') {
        const f = FUNCS.get(key);
        if (f) {
          out += f;
          if (f === 'url') {
            let j = v.indexOf(')', i); if (j < 0) j = n;
            out += v.slice(i, j); i = j;
          }
          continue;
        }
        out += w; continue;
      }
      out += (extra && extra.get(key)) || VALS.get(key) || w;
      continue;
    }
    out += c; i++;
  }
  return out;
}
function convSelector(sel) {
  return sel.replace(/(\[[^\]]*\])|(::?)([\u0600-\u06FFA-Za-z-][\u0600-\u06FF\w-]*)|([.#])([\u0600-\u06FFA-Za-z_-][\u0600-\u06FF\w-]*)|([\u0600-\u06FFA-Za-z_-][\u0600-\u06FF\w-]*)/g,
    (m, br, pc, pn, cc, cn, id) => {
      if (br) {
        const inner = br.slice(1, -1);
        const ix = inner.search(/[~|^$*]?=/);
        if (ix < 0) return '[' + attrEn(inner.trim()) + ']';
        const rawName = inner.slice(0, ix).trim();
        const name = attrEn(rawName);
        const mk_ = REV ? rawName.toLowerCase() : name;
        const mm = /^([~|^$*]?=)\s*(["']?)(.*?)\2\s*$/.exec(inner.slice(ix));
        if (!mm) return br;
        let val = mm[3];
        if (ATTRVALS[mk_]) val = ATTRVALS[mk_].get(norm(val)) || val;
        return '[' + name + mm[1] + mm[2] + val + mm[2] + ']';
      }
      if (pc) return pc + (PSEUDO.get(norm(pn)) || pn);
      if (cc) return m;
      return SELTAGS.get(norm(id)) || id;
    });
}
function peelComments(body) {
  let pre = '';
  while (body.startsWith('/*')) {
    const e = body.indexOf('*/'); if (e < 0) break;
    pre += body.slice(0, e + 2); body = body.slice(e + 2);
    const w = /^\s*/.exec(body)[0]; pre += w; body = body.slice(w.length);
  }
  return [pre, body];
}
function convMedia(rest) {
  const extra = new Map([...MEDIA, ...PROPS]);
  return convValue(rest, extra);
}
function convAtPrelude(body) {
  const m = /^@([^\s({;]+)([\s\S]*)$/.exec(body);
  if (!m) return body;
  const en = ATS.get(norm(m[1])) || m[1];
  const ek = REV ? norm(m[1]) : en;
  let rest = m[2];
  if (ek === 'media' || ek === 'supports') rest = convMedia(rest);
  else if (ek === 'import') rest = convValue(rest);
  return '@' + en + rest;
}
function convDeclOrAt(chunk) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(chunk);
  if (!m[2]) return chunk;
  const [cm, body] = peelComments(m[2]);
  if (!body) return chunk;
  if (body[0] === '@') return m[1] + cm + convAtPrelude(body) + m[3];
  const c = body.indexOf(':');
  if (c < 0) return chunk;
  const propRaw = body.slice(0, c), prop = propRaw.trim();
  const en = prop.startsWith('--') ? prop : (PROPS.get(norm(prop)) || prop);
  return m[1] + cm + propRaw.replace(prop, en) + ':' + convValue(body.slice(c + 1)) + m[3];
}
function convPrelude(chunk) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(chunk);
  if (!m[2]) return chunk;
  const [cm, body] = peelComments(m[2]);
  if (body[0] === '@') return m[1] + cm + convAtPrelude(body) + m[3];
  return m[1] + cm + convSelector(body) + m[3];
}
function cssBody(s, i, inner) {
  let out = '';
  const n = s.length;
  while (i < n) {
    let j = i, dp = 0, term = '';
    while (j < n) {
      const ch = s[j];
      if (ch === '/' && s[j + 1] === '*') { const e = s.indexOf('*/', j + 2); j = e < 0 ? n : e + 2; continue; }
      if (ch === '"' || ch === "'") { let e = j + 1; while (e < n && s[e] !== ch) { if (s[e] === '\\') e++; e++; } j = e + 1; continue; }
      if (ch === '(') dp++; else if (ch === ')') dp--;
      else if (dp <= 0 && (ch === ';' || ch === '{' || ch === '}')) { term = ch; break; }
      j++;
    }
    const chunk = s.slice(i, j);
    if (term === '}') {
      out += convDeclOrAt(chunk);
      if (inner) return { out, i: j + 1 };
      out += '}'; i = j + 1; continue;
    }
    if (term === '{') {
      out += convPrelude(chunk) + '{';
      const r = cssBody(s, j + 1, true);
      out += r.out + '}'; i = r.i; continue;
    }
    if (term === ';') { out += convDeclOrAt(chunk) + ';'; i = j + 1; continue; }
    out += convDeclOrAt(chunk); i = n; break;
  }
  return { out, i: n };
}
function convCSS(src) { return cssBody(fixPunct(src, false), 0, false).out; }

/* ============ تحويل HTML ============ */
const RE_TAG = /<(\/?)([\u0600-\u06FFA-Za-z][^\s>\/<]*)/y;
const RE_DECL = /<!([^\s>\-][^\s>]*)/y;
function parseTag(src, i) {
  RE_TAG.lastIndex = i;
  const m = RE_TAG.exec(src);
  if (!m) return null;
  const n = src.length;
  let p = RE_TAG.lastIndex, closed = false;
  const toks = [];
  while (p < n) {
    let s = p; while (p < n && /\s/.test(src[p])) p++;
    if (p > s) toks.push({ k: 'ws', s: src.slice(s, p) });
    if (p >= n) break;
    const ch = src[p];
    if (ch === '>') { toks.push({ k: 'end', s: '>' }); p++; closed = true; break; }
    if (ch === '/' && src[p + 1] === '>') { toks.push({ k: 'end', s: '/>' }); p += 2; closed = true; break; }
    if (ch === '<') break;
    let a = p;
    while (p < n && !/[\s=>]/.test(src[p]) && !(src[p] === '/' && src[p + 1] === '>') && src[p] !== '<') p++;
    if (p === a) { toks.push({ k: 'junk', s: src[p] }); p++; continue; }
    toks.push({ k: 'attr', s: src.slice(a, p) });
    let q = p; while (q < n && /\s/.test(src[q])) q++;
    if (src[q] === '=') {
      if (q > p) toks.push({ k: 'ws', s: src.slice(p, q) });
      toks.push({ k: 'eq', s: '=' }); q++;
      const w = q; while (q < n && /\s/.test(src[q])) q++;
      if (q > w) toks.push({ k: 'ws', s: src.slice(w, q) });
      if (src[q] === '"' || src[q] === "'" || src[q] === '“' || src[q] === '‘') {
        const smart = src[q] === '“' || src[q] === '‘';
        const quote = smart ? (src[q] === '“' ? '"' : "'") : src[q];
        const endCh = smart ? (src[q] === '“' ? '”' : '’') : quote;
        let e = src.indexOf(endCh, q + 1); const open = e < 0; if (open) e = n;
        toks.push({ k: 'val', s: src.slice(q + 1, e), q: quote, open });
        q = open ? n : e + 1;
      } else {
        let e = q; while (e < n && !/[\s>]/.test(src[e])) e++;
        toks.push({ k: 'val', s: src.slice(q, e), q: '', open: false }); q = e;
      }
      p = q;
    }
  }
  return { i: p, close: m[1] === '/', name: m[2], toks, closed };
}
function findClose(src, from, en) {
  let k = from;
  while ((k = src.indexOf('</', k)) >= 0) {
    const m = /^<\/\s*([^\s>]+)/.exec(src.slice(k, k + 60));
    if (m && tagEn(m[1]) === en) return k;
    k += 2;
  }
  return -1;
}
function convAttrVal(aen, val) {
  if (!REV && /^[\s٠-٩۰-۹.,%]+[؀-ۿA-Za-z%]*$/.test(val) && /[٠-٩۰-۹]/.test(val)) val = d2a(val);
  if (aen === 'style') return cssBody(fixPunct(val, false), 0, false).out;
  if (/^on[a-z]+$/.test(aen)) return convJS(val);
  const map = ATTRVALS[aen];
  if (map) return map.get(norm(val)) || val;
  return val;
}
function convHTML(src) {
  let out = '', i = 0;
  const n = src.length;
  while (i < n) {
    const lt = src.indexOf('<', i);
    if (lt < 0) { out += src.slice(i); break; }
    out += src.slice(i, lt); i = lt;
    if (src.startsWith('<!--', i)) { let j = src.indexOf('-->', i + 4); j = j < 0 ? n : j + 3; out += src.slice(i, j); i = j; continue; }
    RE_DECL.lastIndex = i;
    const dm = RE_DECL.exec(src);
    if (dm) {
      const k = norm(dm[1]);
      const word = REV ? (k === 'doctype' ? 'مستند' : dm[1]) : ((k === 'مستند' || k === 'نوع-المستند' || k === 'doctype') ? 'DOCTYPE' : dm[1]);
      out += '<!' + word; i += 2 + dm[1].length; continue;
    }
    const t = parseTag(src, i);
    if (!t) { out += '<'; i++; continue; }
    const en = tagEn(t.name);
    const enName = REV ? t.name.toLowerCase() : en;
    let buf = '<' + (t.close ? '/' : '') + en, cur = '', curKey = '';
    for (const k of t.toks) {
      if (k.k === 'attr') { cur = attrEn(k.s); curKey = REV ? k.s.toLowerCase() : cur; buf += cur; }
      else if (k.k === 'val') buf += k.q + convAttrVal(curKey, k.s) + (k.open ? '' : k.q);
      else buf += k.s;
    }
    out += buf; i = t.i;
    const last = t.toks[t.toks.length - 1];
    const selfClosed = last && last.s === '/>';
    if (!t.close && t.closed && !selfClosed && (enName === 'style' || enName === 'script')) {
      const c = findClose(src, i, en);
      const end = c < 0 ? n : c;
      const body = src.slice(i, end);
      if (enName === 'style') out += convCSS(body);
      else if (/(type|نوع)\s*=\s*["']?(application\/(ld\+)?json|text\/template|importmap)/i.test(buf)) out += body;
      else out += convJS(body);
      i = end;
    }
  }
  return out;
}

/* ============ واجهة التحويل ============ */
function kindOf(name, mode) {
  if (mode && mode !== 'auto') return mode;
  const m = /\.([a-z0-9]+)$/i.exec(name || '');
  const e = m ? m[1].toLowerCase() : '';
  if (e === 'html' || e === 'htm') return 'html';
  if (e === 'css') return 'css';
  if (e === 'js' || e === 'mjs') return 'js';
  return 'text';
}
const BIDI = /[​-‏‪-‮⁦-⁩﻿]/g;
function convert(text, kind) {
  text = String(text).replace(BIDI, '');
  if (kind === 'html') return convHTML(text);
  if (kind === 'css') return convCSS(text);
  if (kind === 'js') return convJS(text);
  return null;
}
/* إنجليزي -> عربي */
function toArabic(text, kind) {
  text = String(text).replace(BIDI, '');
  if (kind !== 'html' && kind !== 'css' && kind !== 'js') return null;
  setDir(true);
  try {
    if (kind === 'html') return convHTML(text);
    if (kind === 'css') return convCSS(text);
    return convJS(text);
  } finally { setDir(false); }
}

/* ============ التلوين ============ */
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sp = (c, t) => '<span class="' + c + '">' + esc(t) + '</span>';

const JSRE = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?|`(?:[^`\\]|\\.)*`?)|([0-9][\w.]*|[٠-٩]+)|([\u0600-\u06FF$A-Za-z_][\u0600-\u06FF$\w]*)|([\s\S])/g;
function hlJS(src) {
  let out = '';
  src.replace(JSRE, (m, cm, st, nm, id, ot, off) => {
    if (cm) out += sp('c-cm', cm);
    else if (st) out += sp('c-st', st);
    else if (nm) out += sp('c-nm', nm);
    else if (id) {
      const key = norm(id);
      let k = off - 1; while (k >= 0 && /\s/.test(src[k])) k--;
      let cls = '';
      if (k >= 0 && src[k] === '.') cls = JSM.has(key) ? 'c-fn' : '';
      else if (JSKW.has(key) || EN_KW.has(id)) cls = 'c-kw';
      else if (JSG.has(key) || EN_GL.has(id)) cls = 'c-gl';
      else if (src[off + id.length] === '(') cls = 'c-fn';
      out += cls ? sp(cls, id) : esc(id);
    } else out += esc(ot);
    return '';
  });
  return out;
}
function hlVal(v) {
  return v.replace(/("[^"]*"|'[^']*')|(#[0-9a-zA-Z]+)|([0-9٠-٩]*\.?[0-9٠-٩]+[\u0600-\u06FFA-Za-z%_]*)|(!\s*[\u0600-\u06FFA-Za-z]+)|([\u0600-\u06FFA-Za-z_-][\u0600-\u06FF\w-]*)|([\s\S])/g,
    (m, st, hx, nm, im, id, ot, off) => {
      if (st) return sp('c-st', st);
      if (hx || nm) return sp('c-nm', m);
      if (im) return sp('c-kw', m);
      if (id) {
        const key = norm(id);
        if (v[off + id.length] === '(') return sp('c-fn', id);
        return VALS.has(key) ? sp('c-vl', id) : esc(id);
      }
      return esc(ot);
    });
}
function hlDecl(p) {
  const m = /^(\s*)([^:]*?)(\s*)(:)([\s\S]*)$/.exec(p);
  if (!m) return hlVal(p);
  const known = PROPS.has(norm(m[2])) || m[2].startsWith('--') || /^[a-z-]+$/.test(m[2]);
  return m[1] + sp(known ? 'c-pr' : 'c-pu', m[2]) + m[3] + sp('c-pn', ':') + hlVal(m[5]);
}
function hlSel(p) {
  return p.replace(/(@[^\s({]+)|(\[[^\]]*\])|(::?[\u0600-\u06FFA-Za-z-][\u0600-\u06FF\w-]*)|([.][\u0600-\u06FFA-Za-z_-][\u0600-\u06FF\w-]*)|(#[\u0600-\u06FFA-Za-z_-][\u0600-\u06FF\w-]*)|([\u0600-\u06FFA-Za-z_-][\u0600-\u06FF\w-]*)|([\s\S])/g,
    (m, at, br, ps, cl, id, tg, ot) => {
      if (at) return sp('c-kw', at);
      if (br) return sp('c-at', br);
      if (ps) return sp('c-ps', ps);
      if (cl) return sp('c-cl', cl);
      if (id) return sp('c-id', id);
      if (tg) return SELTAGS.has(norm(tg)) || EN_TAGS.has(tg) ? sp('c-tg', tg) : esc(tg);
      return esc(ot);
    });
}
function hlCSS(src) {
  let out = '';
  const re = /(\/\*[\s\S]*?(?:\*\/|$))|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)|([{}])|([^{}"'\/]+|\/)/g;
  let m;
  while ((m = re.exec(src))) {
    if (m[1]) out += sp('c-cm', m[1]);
    else if (m[2]) out += sp('c-st', m[2]);
    else if (m[3]) out += sp('c-pn', m[3]);
    else {
      const next = src[re.lastIndex];
      const parts = m[4].split(/(;)/);
      for (let k = 0; k < parts.length; k++) {
        const p = parts[k];
        if (p === ';') { out += sp('c-pn', ';'); continue; }
        out += (k === parts.length - 1 && next === '{') ? hlSel(p) : hlDecl(p);
      }
    }
  }
  return out;
}
function hlHTML(src) {
  let out = '', i = 0;
  const n = src.length;
  while (i < n) {
    const lt = src.indexOf('<', i);
    if (lt < 0) { out += esc(src.slice(i)); break; }
    out += esc(src.slice(i, lt)); i = lt;
    if (src.startsWith('<!--', i)) { let j = src.indexOf('-->', i + 4); j = j < 0 ? n : j + 3; out += sp('c-cm', src.slice(i, j)); i = j; continue; }
    RE_DECL.lastIndex = i;
    const dm = RE_DECL.exec(src);
    if (dm) {
      let j = src.indexOf('>', i); j = j < 0 ? n : j + 1;
      out += sp('c-pn', '<!') + sp('c-kw', dm[1]) + esc(src.slice(i + 2 + dm[1].length, j)); i = j; continue;
    }
    const t = parseTag(src, i);
    if (!t) { out += '&lt;'; i++; continue; }
    const en = tagEn(t.name);
    const known = TAGS.has(norm(t.name)) || EN_TAGS.has(t.name.toLowerCase());
    out += sp('c-pn', '<' + (t.close ? '/' : '')) + sp(known ? 'c-tg' : 'c-tu', t.name);
    for (const k of t.toks) {
      if (k.k === 'ws') out += k.s;
      else if (k.k === 'attr') {
        const a = attrEn(k.s);
        out += sp(a !== k.s || EN_ATTRS.has(k.s.toLowerCase()) || /^(data|aria)-/.test(k.s) ? 'c-at' : 'c-au', k.s);
      } else if (k.k === 'eq') out += sp('c-pn', '=');
      else if (k.k === 'val') out += sp('c-st', k.q + k.s + (k.open ? '' : k.q));
      else out += sp('c-pn', k.s);
    }
    i = t.i;
    const last = t.toks[t.toks.length - 1];
    const selfClosed = last && last.s === '/>';
    if (!t.close && t.closed && !selfClosed && (en === 'style' || en === 'script')) {
      const c = findClose(src, i, en);
      const end = c < 0 ? n : c;
      const body = src.slice(i, end);
      out += en === 'style' ? hlCSS(body) : hlJS(body);
      i = end;
    }
  }
  return out;
}
function highlight(text, kind) {
  if (text.length > 200000) return esc(text);
  if (kind === 'html') return hlHTML(text);
  if (kind === 'css') return hlCSS(text);
  if (kind === 'js') return hlJS(text);
  return esc(text);
}

/* ============ تنسيق ============ */
function reindent(src, kind) {
  const lines = src.replace(/\r/g, '').split('\n');
  let depth = 0;
  const out = [];
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) { out.push(''); continue; }
    let delta = (t.match(/\{/g) || []).length - (t.match(/\}/g) || []).length;
    if (kind === 'html') {
      (t.match(/<\/?[^\s>\/!?][^>]*>/g) || []).forEach(tag => {
        const m = /^<(\/?)([^\s>\/]+)/.exec(tag);
        const en = tagEn(m[2]);
        if (m[1]) delta--;
        else if (!VOID.has(en) && !/\/>$/.test(tag)) delta++;
      });
    } else {
      delta += (t.match(/[\[(]/g) || []).length - (t.match(/[\])]/g) || []).length;
    }
    const lead = /^(<\/|\}|\)|\])/.test(t) ? 1 : 0;
    out.push('  '.repeat(Math.max(0, depth - lead)) + t);
    depth = Math.max(0, depth + delta);
  }
  return out.join('\n');
}

/* ============ سياق الإكمال التلقائي ============ */
function cssCtx(css) {
  const depth = (css.match(/\{/g) || []).length - (css.match(/\}/g) || []).length;
  if (depth > 0) {
    const cut = Math.max(css.lastIndexOf(';'), css.lastIndexOf('{'), css.lastIndexOf('}'));
    return css.slice(cut + 1).indexOf(':') >= 0 ? 'css-val' : 'css-prop';
  }
  return 'css-sel';
}
function attrValCtx(seg) {
  const m = /([^\s=<>"']+)\s*=\s*(["'])([^"']*)$/.exec(seg);
  if (!m) return 'none';
  const en = attrEn(m[1]);
  if (en === 'style') { const t = m[3], last = t.slice(t.lastIndexOf(';') + 1); return last.indexOf(':') >= 0 ? 'css-val' : 'css-prop'; }
  if (/^on[a-z]+$/.test(en)) return 'js';
  if (R.attrVals[en]) return 'val:' + en;
  if (/^(class|id|for)$/.test(en)) return 'names';
  return 'none';
}
function contextAt(before, kind) {
  if (kind === 'js') return 'js';
  if (kind === 'css') return cssCtx(before);
  const lt = before.lastIndexOf('<'), gt = before.lastIndexOf('>');
  if (lt > gt) {
    const seg = before.slice(lt);
    if (/^<\/?[^\s>]*$/.test(seg)) return 'tag';
    if ((seg.match(/["']/g) || []).length % 2) return attrValCtx(seg);
    return 'attr';
  }
  let state = 'html', start = 0, m;
  const re = /<(\/?)([^\s>\/!]+)[^>]*>/g;
  while ((m = re.exec(before))) {
    const en = tagEn(m[2]);
    if (en === 'style' || en === 'script') { state = m[1] ? 'html' : en; start = re.lastIndex; }
  }
  if (state === 'html') return 'text';
  if (state === 'script') return 'js';
  return cssCtx(before.slice(start));
}

/* ============ كلمات الإكمال + نص المعلم ============ */
const W = {
  tags: words(R.tags), attrs: words(R.attrs), props: words(R.cssProps),
  vals: words(Object.assign({}, R.cssVals, R.colors, R.cssFuncs)), pseudo: words(R.cssPseudo), at: words(R.cssAt),
  kw: words(R.jsKw), gl: words(R.jsGlobals), mem: words(R.jsMembers), units: words(R.cssUnits), ev: words(R.jsEvents), attrVals: {}
};
function wordsFor(ctx, afterDot, prev) {
  if (ctx && ctx.indexOf('val:') === 0) { const k = ctx.slice(4); return W.attrVals[k] || (W.attrVals[k] = words(R.attrVals[k] || {})); }
  if (ctx === 'css-sel') { if (prev === '@') return W.at; if (prev === ':') return W.pseudo; if (prev === '.' || prev === '#') return []; }
  if (ctx === 'css-val' && /[0-9.]/.test(prev || '')) return W.units;
  switch (ctx) {
    case 'tag': return W.tags;
    case 'attr': return W.attrs;
    case 'css-prop': return W.props;
    case 'css-val': return W.vals;
    case 'css-sel': return W.tags.concat(W.pseudo);
    case 'js': return afterDot ? W.mem : W.kw.concat(W.gl);
    default: return [];
  }
}
function pairs(o) { return Object.keys(o).map(k => k.split('|')[0] + '=' + o[k]).join('، '); }
function promptDict() {
  return [
    'وسوم HTML: ' + pairs(R.tags),
    'خصائص HTML: ' + pairs(R.attrs),
    'قيم نوع: ' + pairs(R.attrVals.type) + ' | اتجاه: ' + pairs(R.attrVals.dir),
    'خصائص CSS: ' + pairs(R.cssProps),
    'قيم CSS: ' + pairs(R.cssVals) + '، ' + pairs(R.colors),
    'وحدات CSS: ' + pairs(R.cssUnits) + ' | دوال CSS: ' + pairs(R.cssFuncs) + ' | تحديدات: ' + pairs(R.cssPseudo),
    'كلمات JS: ' + pairs(R.jsKw),
    'كائنات JS: ' + pairs(R.jsGlobals),
    'دوال وخصائص JS: ' + pairs(R.jsMembers),
    'احداث JS: ' + pairs(R.jsEvents)
  ].join('\n');
}
function reference() {
  const g = (title, o) => ({ title, items: Object.keys(o).map(k => ({ ar: k.split('|').join(' / '), ins: k.split('|')[0], en: o[k] })) });
  return [
    g('وسوم HTML', R.tags), g('خصائص HTML', R.attrs), g('قيم الخصائص: نوع', R.attrVals.type),
    g('خصائص CSS', R.cssProps), g('قيم CSS', R.cssVals), g('الألوان', R.colors), g('وحدات CSS', R.cssUnits),
    g('دوال CSS', R.cssFuncs), g('تحديدات CSS', R.cssPseudo), g('كلمات JavaScript', R.jsKw),
    g('كائنات JavaScript', R.jsGlobals), g('دوال وخصائص JavaScript', R.jsMembers), g('أحداث', R.jsEvents)
  ];
}

return {
  norm, tagEn, attrEn, isVoid: en => VOID.has(en), kindOf, convert, toArabic, convHTML, convCSS, convJS,
  highlight, reindent, contextAt, wordsFor, W, promptDict, reference, _R: R
};
})();
if (typeof module !== 'undefined') module.exports = NERO;
