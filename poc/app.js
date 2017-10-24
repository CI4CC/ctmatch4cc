"use strict";function sendQuery(e){var t=$.Deferred();e.success=function(e){t.resolve(e)},e.error=function(e,i,a){null!=e.responseJSON&&"undefined"!=typeof e.responseJSON.message&&(a=e.responseJSON.message),t.reject(e.status,a)},$.ajax(e);var i=t.promise();return i.abort=function(){ajaxDef.abort(),t.reject(409,"Request was cancelled")},i}function getTrialByNCTID(e){return sendQuery({url:"https://clinicaltrialsapi.cancer.gov/v1/clinical-trial/"+e,type:"get"})}function getPatients(e,t,i,a,n){return sendQuery({url:"https://trial.nimblify.com/nimblify-api-web/public/patients",data:{"anatomical-site-desc":e,details:n},type:"get"})}$(document).ready(function(){$("#btn-nct-fetch").on("click",function(){var e=$("#nctid").val(),t=$("#spinner-nct").show();getTrialByNCTID(e).then(function(e){function i(e,t,i){e.append('<div class="flex-row"><div class="cell field-label">'+t+'</div><div class="cell" style="flex-grow: 1;">'+i+"</div></div>")}t.hide(),$("#protocol-data").text(JSON.stringify(e,null,2));var a=$("#protocol-details").html("");i(a,"NCTID",e.nct_id),i(a,"Protocol ID",e.protocol_id),i(a,"Name",e.brief_title),i(a,"Sites",e.anatomic_sites.join(", ")),i(a,"Gender",e.eligibility.structured.gender),i(a,"Max Age",e.eligibility.structured.max_age_in_years),i(a,"Min Age",e.eligibility.structured.min_age_in_years),$("#anatomic-site").val(e.anatomic_sites[0]),$("#min-age-years").val(e.eligibility.structured.min_age_in_years),$("#max-age-years").val(e.eligibility.structured.max_age_in_years);var n=e.eligibility.structured.gender;(n="FEMALE")?$("#gender").val("F"):(n="MALE")?$("#gender").val("F"):$("#gender").val("")})}),$("#btn-forte-fetch").on("click",function(){var e=$("#anatomic-site").val(),t=$("#min-age-years").val(),i=$("#max-age-years").val(),a=$("#gender").val(),n=$("#details").val(),r=$("#spinner-forte").show();getPatients(e,t,i,a,n).then(function(e){r.hide(),$("#patient-data").text(JSON.stringify(e,null,2))})})});