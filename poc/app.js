"use strict";function sendQuery(e){var t=$.Deferred();e.success=function(e){t.resolve(e)},e.error=function(e,i,a){null!=e.responseJSON&&"undefined"!=typeof e.responseJSON.message&&(a=e.responseJSON.message),t.reject(e.status,a)},$.ajax(e);var i=t.promise();return i.abort=function(){ajaxDef.abort(),t.reject(409,"Request was cancelled")},i}function getTrialByNCTID(e){return sendQuery({url:"https://clinicaltrialsapi.cancer.gov/v1/clinical-trial/"+e,type:"get"})}function getPatients(e,t,i,a,n){return sendQuery(""===a?{url:"https://trial.nimblify.com/nimblify-api-web/public/patients",data:{"anatomical-site-desc":e,details:n,"min-age":t,"max-age":i},type:"get"}:{url:"https://trial.nimblify.com/nimblify-api-web/public/patients",data:{"anatomical-site-desc":e,details:n,gender:a,"min-age":t,"max-age":i},type:"get"})}$(document).ready(function(){$("#btn-nct-fetch").on("click",function(){var e=$("#nctid").val(),t=$("#spinner-nct").show();getTrialByNCTID(e).then(function(e){function i(e,t,i){e.append('<div class="flex-row"><div class="cell field-label">'+t+'</div><div class="cell" style="flex-grow: 1;">'+i+"</div></div>")}t.hide(),$("#protocol-data").text(JSON.stringify(e,null,2));var a=$("#protocol-details").html("");i(a,"NCTID",e.nct_id),i(a,"Protocol ID",e.protocol_id),i(a,"Name",e.brief_title),i(a,"Sites",e.anatomic_sites.join(", ")),i(a,"Gender",e.eligibility.structured.gender),i(a,"Max Age",e.eligibility.structured.max_age_in_years),i(a,"Min Age",e.eligibility.structured.min_age_in_years),$("#anatomic-site").val(e.anatomic_sites[0]),$("#min-age-years").val(e.eligibility.structured.min_age_in_years),$("#max-age-years").val(e.eligibility.structured.max_age_in_years);var n=e.eligibility.structured.gender;(n="FEMALE")?$("#gender").val("F"):(n="MALE")?$("#gender").val("F"):$("#gender").val("")})}),$("#btn-forte-fetch").on("click",function(){var e=$("#anatomic-site").val(),t=$("#min-age-years").val(),i=$("#max-age-years").val(),a=$("#gender").val(),n=$("#details").val(),l=$("#spinner-forte").show();getPatients(e,t,i,a,n).then(function(e){function t(e,t,i){e.append('<div class="flex-row"><div class="cell field-label">'+t+'</div><div class="cell" style="flex-grow: 1;">'+i+"</div></div>")}l.hide(),$("#patient-data").text(JSON.stringify(e,null,2));var i=$("#patient-details").html("");if(n="Y")for(var a=e[0].patients.length,s=0;s<a;s++)t(i,"MRN",e[0].patients[s].mrn),t(i,"Gender",e[0].patients[s].gender),t(i,"Disease Site",e[0].patients[s].siteDesc),t(i,"ICD Code",e[0].patients[s].siteCode),t(i,"DOB",e[0].patients[s].dob),t(i,"Age",e[0].patients[s].age),t(i,"","&nbsp;");else for(var r=e.length,s=0;s<r;s++)t(i,"Site",e[s].orgName),t(i,"Patient Count",e[s].patientCount),t(i,"","&nbsp;")})})});