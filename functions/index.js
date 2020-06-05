const functions = require('firebase-functions')
const admin=require('firebase-admin');
const nodemailer =require('nodemailer');
admin.initializeApp()
require('dotenv').config()

const {SENDER_EMAIL,SENDER_PASSWORD}= process.env;

exports.sendEmailNotification=functions.firestore.document('submissions/{docId}')
.onCreate((snap,ctx)=>{
    const data=snap.data();
    let authData=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:SENDER_EMAIL,
            pass:SENDER_PASSWORD
        }
    });
    authData.sendMail({
        from:'edenik.com.jewellerystore@gmail.com‏',
        to:`${data.userEmail}`,
        subject:'Your submission info',
        text:`${data.userEmail}`,
        html:`        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="format-detection" content="date=no" />
            <meta name="format-detection" content="address=no" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="x-apple-disable-message-reformatting" />
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet" />
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.11.2/css/all.css">
        
            <!--<![endif]-->
            <title>*|MC:SUBJECT|*</title>
            <!--[if gte mso 9]>
            <style type="text/css" media="all">
                sup { font-size: 100% !important; }
            </style>
            <![endif]-->
            
        
            <style type="text/css" media="screen">
                /* Linked Styles */
				html { direction:ltr}
                body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none }
                a { color:#66c7ff; text-decoration:none }
                p { padding:0 !important; margin:0 !important } 
                img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
                .mcnPreviewText { display: none !important; }
        
                .cke_editable,
                .cke_editable a,
                .cke_editable span,
                .cke_editable a span { color: #000001 !important; }		
                /* Mobile styles */
                @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                    .mobile-shell { width: 100% !important; min-width: 100% !important; }
                    .bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
                    
                    .text-header,
                    .m-center { text-align: center !important; }
                    
                    .center { margin: 0 auto !important; }
                    .container { padding: 0px 10px 10px 10px !important }
                    
                    .td { width: 100% !important; min-width: 100% !important; }
        
                    .text-nav { line-height: 28px !important; }
                    .p30 { padding: 15px !important; }
        
                    .m15 { height: 15px !important; }
                    .p30-15 { padding: 30px 15px !important; }
                    .p40 { padding: 20px !important; }
        
                    .m-td,
                    .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
        
                    .m-block { display: block !important; }
        
                    .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
        
                    .column,
                    .column-top,
                    .column-empty,
                    .column-empty2,
                    .column-dir-top { float: left !important; width: 100% !important; display: block !important; }
                    .column-empty { padding-bottom: 10px !important; }
                    .column-empty2 { padding-bottom: 20px !important; }
                    .content-spacing { width: 15px !important; }
                }
            </style>
        </head>
        <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
                <tr>
                    <td align="center" valign="top">
                        <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                            <tr>
                                <td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:20px 0px 40px 0px;">
        
            
                                    <!-- Title + Text Center -->
                                    <div mc:repeatable="Select" mc:variant="Title + Text Center">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                            <tr>
                                                <td class="img" height="10" bgcolor="#4ec7ff" style="font-size:0pt; line-height:0pt; text-align:left;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td class="p30-15" style="padding: 45px 30px;" bgcolor="#ffffff" align="center">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="h1 center pb20" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:28px; line-height:34px; text-align:center; padding-bottom:20px;"><div mc:edit="text_2"><i class="fad fa-rings-wedding" style="font-size: 30px;"></i><p>Jewellery Store</p></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text center" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:center;"><div mc:edit="text_3">Hello ${data.userName}, Thank you for contacting us! </div></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- END Title + Text Center -->
        
                                    <!-- Hero -->
                                    <div mc:repeatable="Select" mc:variant="Hero">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="padding-bottom: 10px;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        
                                                        <tr>
                                                            <td class="p30-15" style="padding: 15px 30px;" bgcolor="#4ec7ff">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="text white m-center" style="font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; color:#ffffff;"><div mc:edit="text_4">This is development project, Created by Eden Nahum.</div></td>
                                                                                </tr>
                                                                            </table>
                                                                        </th>
                                                                        <th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                                        <th class="column" width="200" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td align="right">
                                                                                        <table class="center" border="0" cellspacing="0" cellpadding="0" style="text-align:center;">
                                                                                            <tr>
                                                                                                <td class="text-button white-button" style="font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 30px; text-align:center; border-radius:24px; color:#ffffff; border:2px solid #ffffff;"><div mc:edit="text_5"><a href="https://Edenik.com" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">SEE MORE</span> &nbsp; <i class="fas fa-arrow-right"></i></a></div></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </th>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- END Hero -->
        
                                    <!-- Two Columns / No Images -->
                                    <div mc:repeatable="Select" mc:variant="Two Columns / No Images">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td class="pb10" style="padding-bottom:10px;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <th class="column-top" width="320" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td class="p30 p30-15" style="padding:30px;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="h3 pb25" style="color:#050505; font-family:'Roboto', Arial,sans-serif; font-size:20px; line-height:28px; text-align:left; padding-bottom:25px;"><div mc:edit="text_9">How we can help you? <br>-${data.helpText}</div></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td class="text pb25" style="color:#666666; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:28px; text-align:left; padding-bottom:25px;"><div mc:edit="text_10">   
                                                                                    <a href="${data.itemLink}">${data.itemTitle}</a>
                                                                                    <p>Phone: ${data.userPhone}</p> </div></td>
                                                                                </tr>
                                                                                <tr mc:hideable>
                                                                                    <td align="left">
                                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td class="text-button" style="color:#4ec7ff; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:18px; border:2px solid #4ec7ff; padding:12px 30px; text-align:center; border-radius:24px;"><div mc:edit="text_11"><a href="PUTLINK" target="_blank" class="link4" style="color:#4ec7ff; text-decoration:none;"><span class="link4" style="color:#4ec7ff; text-decoration:none;">SEE MORE &nbsp; <i class="fas fa-arrow-right"></i></a></div></td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                            <th class="column-empty" width="10" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                            <th class="column-top" width="320" bgcolor="#ffffff" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td class="p30 p30-15" style="padding:30px;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
        
                                                                                <tr>
                                                                                    <td><div mc:edit="text_7"> <img src="${data.itemImage}" alt=""> </div></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </th>
        
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <!-- END Two Columns / No Images -->
        
                                    <!-- Footer -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="padding-bottom: 30px;">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="#" target="_blank"><img src="images/t8_ico_facebook.jpg" width="38" height="38" mc:edit="image_6" style="max-width:38px;" border="0" alt="" /></a></td>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="#" target="_blank"><img src="images/t8_ico_twitter.jpg" width="38" height="38" mc:edit="image_7" style="max-width:38px;" border="0" alt="" /></a></td>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="#" target="_blank"><img src="images/t8_ico_instagram.jpg" width="38" height="38" mc:edit="image_8" style="max-width:38px;" border="0" alt="" /></a></td>
                                                                    <td class="img" width="38" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="#" target="_blank"><img src="images/t8_ico_linkedin.jpg" width="38" height="38" mc:edit="image_9" style="max-width:38px;" border="0" alt="" /></a></td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer1 pb10" style="color:#999999; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;"><div mc:edit="text_27">This store app developed by: Eden Nahum</div></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer2 pb30" style="color:#999999; font-family:'Roboto', Arial,sans-serif; font-size:14px; line-height:26px; text-align:center; padding-bottom:30px;"><div mc:edit="text_28"><a href="https://Edenik.com">Edenik.Com</a></div></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Footer -->
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`,
    }).then(res=>console.log('Mail succesfully sent to ' + data.userEmail)).catch(err=>console.log(err));
});

