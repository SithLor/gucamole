window.dji=window.dji||{};window.dji.cwe=window.dji.cwe||{};
window.dji.cwe.DocumentTextMapperAdapter=function(){class c{constructor(){this.m_predictionsStartStrategy=new window.dji.mapping.SkipTextMappingStrategy(window.dji.mapping.Skip.WORD,10,!0);this.m_predictionsEndStrategy=new window.dji.mapping.SkipTextMappingStrategy(window.dji.mapping.Skip.WORD,10,!0,window.dji.mapping.Origin.CARET,!1);this.m_predictionsTextMapper=new window.dji.mapping.DocumentTextMapper;this.m_predictionsTextMapper.addPlugin(new window.dji.mapping.plugins.NodeMappingPlugin);this.m_predictionsTextMapper.addPlugin(new window.dji.mapping.plugins.SelectionOffsetMapperPlugin);
this.m_docTextMapper=new window.dji.mapping.DocumentTextMapper}mapContextForPredictions(b,a=null){a=a||window.dji.utils.activeElementInfo();return this.m_predictionsTextMapper.mapDocumentText(this.m_predictionsStartStrategy,this.m_predictionsEndStrategy,a,b)}getDocumentText(b,a=null){a=a||window.dji.utils.activeElementInfo();return this.m_docTextMapper.mapDocumentText(null,null,a,b)}}return c}();
