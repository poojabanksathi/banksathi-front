export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const BASE_URL_TRYMICRO = 'https://trymicroapi.banksathi.com/'
export const BASE_URL_TRYACT = 'https://tryact.banksathi.com/'

export const PRODUCTSAPI = {
  TrendingProductCategory: 'api/v1/product/trending_product_based_on_category',
  productRef: 'api/v1/product/product_ref',
  productRating: 'api/v1/product/product_rating',
  productParagraphTag: 'api/v1/product/product_h1_paragraph_and_meta_tag',
  getProductProsCons: 'api/v1/product/get_product_pros_cons',
  getProductDetails: 'api/v1/product/get_product_details',
  getAlternateProduct: 'api/v1/product/get_alternate_product',
  productformLongcontent: 'api/v1/product/long_form_content',
  reviewProductadd: 'api/v1/product/add_product_review',
  getAllReview: 'api/v1/product/get_product_all_review',
  getOverallRating: 'api/v1/product/get_overall_rating',
  getOwnProductReview: 'api/v1/product/get_own_product_review',
  likeunlikereview: 'api/v1/product/like_unlike_product_review'
}

export const FAQAPI = {
  productFaq: 'api/v1/faqs/product_faq'
}

export const AUTHUSER = {
  verifyUser: 'api/v1/auth_user/verify_user',
  initinatOtp: 'api/v1/auth_user/initinate_otp',
  authVerifyToken: 'api/v1/auth_user/auth_user_verify_token'
}

export const LEADAPPAPI = {
  leadaddgloble: 'api/v1/lead/add_lead_details',
  leadsendotp: 'api/v1/auth_user/initinate_otp',
  leadverifyotp: 'api/leadapi/verify-otp'
}

export const CONTACTAUTH = {
  contactsendotp: 'api/v1/common/send_otp_contact_us',
  contactotpverify: 'api/v1/common/verify_otp_contact_us'
}

export const CIBIL = {
  cibilregister: 'api/v1/cibil/register',
  cibilsendotpmasked: 'api/v1/experian/send_otp_for_masked_number',
  cibilvalidateotp: 'api/v1/cibil/validate_otp',
  withoutotpcibil: 'api/v1/cibil/experian_cibil_with_otp_bypass_register'
}
export const USERSET = {
  getusersetup: 'api/v1/user/get_user_profile',
  updateusersetup: 'api/v1/user/update_user_profile',
  enquirycibil: 'api/v1/user/get_enquiry_for_cibil',
  creditscorehistory: 'api/v1/user/get_credit_score_history',
  paymenthistory: 'api/v1/user/get_payment_history',
  creditage: 'api/v1/user/get_credit_age',
  creditutilisation: 'api/v1/user/get_credit_card_utilisation',
  totalaccount: 'api/v1/user/get_total_accounts',
  leadmyapplication: 'api/v1/user/get_lead_application_status',
  leadapplog: 'api/v1/user/get_lead_application_log'
}

export const COMMON = {
  registerDevice: 'api/v1/common/registerdevice',
  commonGetTopMenu: 'api/v1/common/get_top_menu',
  commonSearch: 'api/v1/common/search',
  panVerify: 'api/v1/common/pan_verify',
  pinCodeVerify: 'api/v1/common/get_pincode_list',
  metaDetailPage: 'api/v1/common/page_meta_detail',
  recommendProductSavingCal: 'api/v1/common/recommend_product',
  panMobValidation: 'api/v1/common/mobile_pan_relation',
  bestFitCards: 'api/v1/common/get_best_fit_card_for_user'
}
export const ELIGIBILITY = {
  eligibilityRegister: 'api/v1/eligibility/register_to_check_eligibility_with_cibil_otp_bypass',
  eligibilityValidOtp: 'api/v1/eligibility/validate_otp_to_check_eligibility'
}

export const BUSINESSCATEGORY = {
  productCategoryLanguage: 'api/v1/businessCategory/product_category_based_on_language',
  categoryTopMenu: 'api/v1/businessCategory/category_top_menu_list',
  CategoryParagraphTag: 'api/v1/businessCategory/category_h1_paragraph_meta_tag',
  productListCategory: 'api/v1/businessCategory/products_list_based_on_category',
  formLongcontent: 'api/v1/businessCategory/long_form_content',
  moreleftmenufilter: 'api/v1/businessCategory/get_left_menu_by_top_pics_credit_score_issuer'
}

export const multipleSlug = {
  productAllDetails: 'api/v1/product/get_product_all_details'
}

export const BUSINESSSUBCATEGORY = {
  productListCatSub: 'api/v1/businessSubCategory/products_list_based_on_subcategory',
  productListCatTags: 'api/v1/businessSubCategory/sub_category_h1_paragraph_meta_tag',
  subCatformcontent: 'api/v1/businessSubCategory/long_form_content',
  gettopmorewaydetails: 'api/v1/businessSubCategory/get_top_more_by_more_way_details'
  // gettopmorewaydetails: 'api/v1/businessSubCategory/get_left_menu_by_top_pics_credit_score_issuer',
}
export const mediaCoverageApi = {
  mediaCoverage: 'api/v1/media/media-coverage'
}

export const BLOG = {
  blogPostDetail: 'api/v1/blog/blog_post',
  blogList: 'api/v1/blog/all_blog_post',
  newsList: 'api/v1/blog/get_blog_post_based_on_cat_subcat'
}
export const B2B = {
  b2bCustomerDetails: 'api/v1/b2b/get_user_profile'
}
export const RecommendNews = {
  recommendNewsProducts: 'api/v1/recommend/get_user_specific_recommended_product'
}
export const BrowseServices = {
  serviceTabs: 'api/v1/businessCategory/get_subcategory_of_category',
  consProsOfProduct: 'api/v1/product/get_product_pros_cons'
}
