const templateStrings = [
  '<?xml version="1.0" encoding="UTF-8"?>\n',
  '<VAST xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n', 'xsi:noNamespaceSchemaLocation="vast.xsd" version="3.0">\n',
  '<Ad>\n',
  '<InLine>\n',
  '<AdSystem>Andy</AdSystem>\n',
  '<AdTitle><%= adTitle %></AdTitle>\n',
  '<Description><![CDATA[<%= adTitle %>]]></Description>\n',
  '<Error><![CDATA[<% print(mainURL + "/error?code=[ERRORCODE]&clientId=" + clientId) %>]]></Error>\n',
  '<Impression><![CDATA[<% print(mainURL + "/impression?asset=[ASSETURI]&clientId=" + clientId) %>]]></Impression>\n',
  '<Creatives>\n',
  '<Creative>\n',
  '<Linear>\n',
  '<Duration><%= duration %></Duration>\n',
  '<TrackingEvents>\n',
  '<Tracking event="start"><![CDATA[<% print(mainURL + "/start?asset=[ASSETURI]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="firstQuartile"><![CDATA[<% print(mainURL + "/firstQuartile?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="midpoint"><![CDATA[<% print(mainURL + "/midpoint?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="thirdQuartile"><![CDATA[<% print(mainURL + "/thirdQuartile?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="complete"><![CDATA[<% print(mainURL + "/complete?asset=[ASSETURI]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="mute"><![CDATA[<% print(mainURL + "/mute?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="unmute"><![CDATA[<% print(mainURL + "/unmute?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="rewind"><![CDATA[<% print(mainURL + "/rewind?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="pause"><![CDATA[<% print(mainURL + "/pause?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]]></Tracking>\n',
  '<Tracking event="resume"><![CDATA[<% print(mainURL + "/resume?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="fullscreen"><![CDATA[<% print(mainURL + "/fullscreen?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="creativeView"><![CDATA[<% print(mainURL + "/creativeView?asset=[ASSETURI]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="exitFullscreen"><![CDATA[<% print(mainURL + "/exitFullscreen?asse=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="acceptInvitationLinear"><![CDATA[<% print(mainURL + "/acceptInvitationLinear?asset=[ASSETURI]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="closeLinear"><![CDATA[<% print(mainURL + "/closeLinear?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '<Tracking event="skip"><![CDATA[<% print(mainURL + "/skip?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId) %>]]></Tracking>\n',
  '</TrackingEvents>\n',
  '<VideoClicks>\n',
  '<ClickThrough><![CDATA[<% print(clickThroughURL+qid_value) %>]]></ClickThrough>\n',
  '<ClickTracking><![CDATA[<% print(mainURL + "/clickTracking?asset=[ASSETURI]&offset=[CONTENTPLAYHEAD]&clientId=" + clientId + "&qid=" + qid_value) %>]]></ClickTracking>\n',
  '</VideoClicks>\n',
  '<MediaFiles>\n',
  '<MediaFile delivery="progressive" width="<%= mediaWidth %>" height="<%= mediaHeight %>" type="video/mp4" scalable="true" maintainAspectRatio="true"><![CDATA[<%= mediaURL+adTitle+"/"+adDescription+mediaFileName %>]]></MediaFile>\n',
  '</MediaFiles>\n',
  '</Linear>\n',
  '</Creative>\n',
  '</Creatives>\n',
  '<Extensions>\n',
  '<Fullscreen>\n',
  '<![CDATA[<%= fullscreenData %>]]>\n',
  '</Fullscreen>\n',
  '</Extensions>\n',
  '</InLine>\n',
  '</Ad>\n',
  '</VAST>',
];

export default class VASTBuilder {
  static create(params) {
    let xmlTemplate = _.template(templateStrings.join(''));
    let phpTemplate = _.template(_.map(templateStrings, (string)=> {
      return `echo "${string}";`.replace('\n', '\\n');
    }).join('\n'));
    return {
      xmlTemplate: xmlTemplate(params),
      phpTemplate: phpTemplate(params)
    };
  }
}
