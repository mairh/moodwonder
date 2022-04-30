var config = require('../config/config');
const emailtemplates = {


 mailHeader:
 '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> '+
 ' <html xmlns="http://www.w3.org/1999/xhtml"> '+ 
 '    <head> '+ 
 '       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> '+ 
 '       <meta name="viewport" content="width=device-width, initial-scale=1.0"/> '+ 
 '       <title>MoodWonder</title> '+ 
 '       <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600,800" rel="stylesheet" type="text/css"> '+ 
 '       <style type="text/css"> '+ 
 '          /* Client-specific Styles */ '+ 
 '          div, p, a, li, td { -webkit-text-size-adjust:none; } '+ 
 '          #outlook a {padding:0;} /* Force Outlook to provide a "view in browser" menu link. */ '+ 
 '          html{width: 100%; } '+ 
 '          body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; background-color:#eceff1; } '+ 
 '          /* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */ '+ 
 '          .ExternalClass {width:100%;} /* Force Hotmail to display emails at full width */ '+ 
 '          .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing. */ '+ 
 '          #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;} '+ 
 '          img {outline:none; text-decoration:none;border:none; -ms-interpolation-mode: bicubic;} '+ 
 '          a img {border:none;} '+ 
 '          .image_fix {display:block;} '+ 
 '          p {margin: 0px 0px !important;} '+ 
 '          table td {border-collapse: collapse;} '+ 
 '          table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } '+ 
 '          a {color: #33b9ff;text-decoration: none;text-decoration:none!important;} '+ 
 '          /*STYLES*/ '+ 
 '          table[class=full] { width: 100%; clear: both; } '+ 
 '          /*IPAD STYLES*/ '+ 
 '          @media only screen and (max-width: 640px) { '+ 
 '          a[href^="tel"], a[href^="sms"] { '+ 
 '          text-decoration: none; '+ 
 '          color: #33b9ff; /* or whatever your want */ '+ 
 '          pointer-events: none; '+ 
 '          cursor: default; '+ 
 '          } '+ 
 '          .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] { '+ 
 '          text-decoration: default; '+ 
 '          color: #33b9ff !important; '+ 
 '          pointer-events: auto; '+ 
 '          cursor: default; '+ 
 '          } '+ 
 '          table[class=devicewidth] {width: 440px!important;} '+ 
 '          table[class=devicewidthinner] {width: 420px!important;} '+ 
 '          img[class=banner] {width: 440px!important;height:130px!important;} '+ 
 '          img[class=col2img] {width: 440px!important;height:220px!important;} '+ 
 '           '+ 
 '           '+ 
 '          } '+ 
 '          /*IPHONE STYLES*/ '+ 
 '          @media only screen and (max-width: 480px) { '+ 
 '          a[href^="tel"], a[href^="sms"] { '+ 
 '          text-decoration: none; '+ 
 '          color: #33b9ff; /* or whatever your want */ '+ 
 '          pointer-events: none; '+ 
 '          cursor: default; '+ 
 '          } '+ 
 '          .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] { '+ 
 '          text-decoration: default; '+ 
 '          color: #33b9ff !important;  '+ 
 '          pointer-events: auto; '+ 
 '          cursor: default; '+ 
 '          } '+ 
 '          table[class=devicewidth] {width: 320px!important;} '+ 
 '          table[class=devicewidthinner] {width: 260px!important;} '+ 
 '          img[class=banner] {width: 320px!important;height:100px!important;} '+ 
 '          img[class=col2img] {width: 280px!important;height:100px!important;} '+ 
 '           '+ 
 '          '+ 
 '          } '+ 
 '       </style> '+ 
 '    </head> '+ 
 '    <body> '+ 
 ' <br /> '+ 
 ' <table width="100%" bgcolor="#eceff1" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="banner"> '+ 
 '    <tbody> '+ 
 '       <tr> '+ 
 '          <td> '+ 
 '             <table  bgcolor="#FFFFFF" width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> '+ 
 '                <tbody> '+ 
 '                   <tr> '+ 
 '                      <td width="100%"> '+ 
 '                         <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth"> '+ 
 '                            <tbody> '+ 
 '                               <tr> '+ 
 '                                  <!-- start of image --> '+ 
 '                                  <td align="center" st-image="banner-image"> '+ 
 '                                     <div class="imgpop"> '+ 
 '                                        <a target="_blank" href="#"><img width="600" border="0" height="150" alt="" border="0" style="display:block; border:none; outline:none; text-decoration:none;" src="http://design.titechnologies.in/mwemailtemplate/images/top" class="banner"></a> '+ 
 '                                     </div> '+ 
 '                                  </td> '+ 
 '                               </tr> '+ 
 '                            </tbody> '+ 
 '                         </table> '+ 
 '                         <!-- end of image --> '+ 
 '                      </td> '+ 
 '                   </tr> '+ 
 '                </tbody> '+ 
 '             </table> '+ 
 '          </td> '+ 
 '       </tr> '+ 
 '    </tbody> '+ 
 ' </table> '+ 
 '  '+ 
 ' <table width="100%" bgcolor="#eceff1" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="seperator"> '+ 
 '    <tbody> '+ 
 '       <tr> '+ 
 '          <td> '+ 
 '             <table  bgcolor="#FFFFFF"  width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth"> '+ 
 '                <tbody> '+ 
 '                   <tr> '+ 
 '                      <td align="center" height="0" style="font-size:1px; line-height:1px;">&nbsp;</td> '+ 
 '                   </tr> '+ 
 '                </tbody> '+ 
 '             </table> '+ 
 '          </td> '+ 
 '       </tr> '+ 
 '    </tbody> '+ 
 ' </table> '+
 ' <table width="100%" bgcolor="#eceff1" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="full-text"> '+ 
 '    <tbody> '+ 
 '       <tr> '+ 
 '          <td> '+ 
 '             <table  bgcolor="#FFFFFF" width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> '+ 
 '                <tbody> '+ 
 '                   <tr> '+ 
 '                      <td width="100%"> '+ 
 '                         <table bgcolor="#FFFFFF" width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> '+ 
 '                            <tbody> '+ 
 '                               <!-- Spacing --> '+ 
 '                               <tr> '+ 
 '                                  <td height="50" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td> '+ 
 '                               </tr> '+ 
 '                               <!-- Spacing --> '+ 
 '                               <tr> '+ 
 '                                  <td> '+ 
 '                                     <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner"> '+ 
 '                                        <tbody> '+ 
 '                                           <!-- Title --> '+ 
 '                                           <tr> '+ 
 '                                              <td style="font-family: Open Sans, sans-serif; font-size: 16px; color:#666666;  font-weight:400; text-align:left; line-height: 24px;"> ',


 mailFooter:
 '                                              </td> '+ 
 '                                           </tr> '+ 
 '                                           <!-- Spacing --> '+ 
 '                                        </tbody> '+ 
 '                                     </table> '+ 
 '                                  </td> '+ 
 '                               </tr> '+ 
 '                               <!-- Spacing --> '+ 
 '                               <tr> '+ 
 '                                  <td height="" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td> '+ 
 '                               </tr> '+ 
 '                               <!-- Spacing --> '+ 
 '                            </tbody> '+ 
 '                         </table> '+ 
 '                      </td> '+ 
 '                   </tr> '+ 
 '                </tbody> '+ 
 '             </table> '+ 
 '          </td> '+ 
 '       </tr> '+ 
 '    </tbody> '+ 
 ' </table> '+
 ' <table width="100%" bgcolor="#eceff1" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="seperator"> '+ 
 '    <tbody> '+ 
 '       <tr> '+ 
 '          <td> '+ 
 '             <table  bgcolor="#FFFFFF" width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth"> '+ 
 '                <tbody> '+ 
 '                   <tr> '+ 
 '                      <td align="center" height="50" style="font-size:1px; line-height:1px;">&nbsp;</td> '+ 
 '                   </tr> '+ 
 '                </tbody> '+ 
 '             </table> '+ 
 '          </td> '+ 
 '       </tr> '+ 
 '    </tbody> '+ 
 ' </table> '+ 
 ' <!-- End of seperator --> '+ 
 ' <!-- Start of footer --> '+ 
 ' <table width="100%" bgcolor="#eceff1" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="footer"> '+ 
 '    <tbody> '+ 
 '       <tr> '+ 
 '          <td> '+ 
 '             <table   bgcolor="#FFFFFF" width="600"  cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> '+ 
 '                <tbody> '+ 
 '                   <tr> '+ 
 '                      <td width="100%"> '+ 
 '                         <table bgcolor="#03afa9" width="600" height="100" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> '+ 
 '                            <tbody> '+ 
 '                               <!-- Spacing --> '+ 
 '                               <tr> '+ 
 '                                  <td height="" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td> '+ 
 '                               </tr> '+ 
 '                               <!-- Spacing --> '+ 
 '                               <tr> '+ 
 '                               <td width="20"></td> '+ 
 '                                  <td  style="font-family: Open Sans, sans-serif; font-size: 16px;  color: #fbbd08; text-align:justify; line-height: 24px;"> '+ 
 '                                    '+ 
 '                                    Copyright &copy; 2015 MoodWonder '+ 
 '                                    <a href="' + config.staticUrl +'" style=" float: right; padding-right: 20px; color: #fbbd08; ">Visit MoodWonder</a>'+ 
 '                                  </td> '+ 
 '                               </tr> '+ 
 '                               <!-- Spacing --> '+ 
 '                               <tr> '+ 
 '                                  <td height="" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;">&nbsp;</td> '+ 
 '                               </tr> '+ 
 '                               <!-- Spacing --> '+ 
 '                            </tbody> '+ 
 '                         </table> '+ 
 '                      </td> '+ 
 '                   </tr> '+ 
 '                    '+ 
 '                </tbody> '+ 
 '             </table> '+ 
 '          </td> '+ 
 '       </tr> '+ 
 '    </tbody> '+ 
 ' </table> '+ 
 '     '+ 
 '    </body> '+ 
 '    </html> ',

  general: function(content) {
      var template = "";
      template += this.mailHeader;
      template += content;
      template += this.mailFooter;
      return template;
  }

};

module.exports = emailtemplates;
