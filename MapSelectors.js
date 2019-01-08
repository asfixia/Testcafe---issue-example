import { Selector } from 'testcafe';

export const BUTTONS = {
    // Botões dos nós dos layers no menu esquerdo.
    TOGGLE_VISIBILITY: "gxp-icon-togglevisibility",
    REMOVE_LAYER: "gxp-icon-removelayers",
    TIMELINE: "icon-timeline-slider",
    SHOW_LEGEND: "gxp-icon-legend-expand",
    VIEW_METADATA: "gxp-icon-viewMetadataButton",
    DOWNLOAD_MAP: "gxp-icon-downloadmapbutton",
    QUERY_PARAMETERS: "gxp-icon-parameters-expand",

    // Botões de controle do mapa no painel lateral (Calculator) ou menu
    // superior (Composed).
    ZOOM_IN: "gxp-icon-zoomin",
    ZOOM_OUT: "gxp-icon-zoomout",
    HIDE_INTERFACE: "icon-hideinterface",
    MAP_INTERACTION: "gxp-icon-onefinger",
    ALERT_TOGGLE: "icon-alerttoggle",
    LEGEND_PANEL: "gxp-icon-customlegend",
    ZOOM_EXTENTS: "icon-zoom-visible",
    SELECTION_ZOOM: "gxp-icon-customzoom",
    FEATURE_INFO: "gxp-icon-getfeatureinfo",
    MEASURE_TOOL: "gxp-icon-measure-length",
    METADATA_TOOL: "gxp-icon-metadataview24",
    HOVER_LEGEND: "icon-hover-feature",
    HELP_INTRO: "icon-helpintro",
    CHANGE_LANGUAGE: "icon-language-eng"
};

function isSelector(selectorOrName) {
    return typeof selectorOrName === "function";
}

export async function closeIntroJs(t) {
    const introJsContainer = Selector('.introjs-tooltip');
    if (introJsContainer.exists) {
        await t
            .click(Selector('.introjs-skipbutton'))
    }
}

export function getLeftLayerPanel() {
    return Selector("#LayerContainer");
}

export function getFloatingBottomContainer() {
    return Selector("#FloatingBottomContainer");
}

export function getLeftPanelLayerNode(layerNodeName) {
    const leftLayerPanel = getLeftLayerPanel();
    return leftLayerPanel.find("div.block_item_text").withExactText(layerNodeName).parent("div.customLayerLeaf");
}

export function getLeftPanelLayerButton(parentLayerNode, buttonType) {
    if (!isSelector(parentLayerNode)) {
        parentLayerNode = getLeftPanelLayerNode(parentLayerNode);
    }
    return parentLayerNode.find("button." + buttonType);
}

export function getTimelinePanel(layerNodeName) {
    const bottomContainer = getFloatingBottomContainer();
    return bottomContainer.find("span").withExactText(layerNodeName).parent("div.timeline");
}

/**
 * Funções para layers no ViewLayerTop.
 */
export function getTopNode(nodeName) {
    return Selector('label').withExactText(nodeName).parent(0);
}

export function getTopNodeLeaf(layerNodeName, parentMenuNode = null) {
    let initialSelector;
    if (parentMenuNode) {
        initialSelector = isSelector(parentMenuNode) ? parentMenuNode.find('div.layer_text') : getTopNode(parentMenuNode).find('div.layer_text');
    } else {
        initialSelector = Selector('div.layer_text');
    }
    return initialSelector.withExactText(layerNodeName).parent("div.menuItem");
}

/**
 * Funções para layers no ViewLayerCapabilities.
 */
export function getComposerRightPanel() {
    return Selector("#RightFloatingContainer");
}

export function getRightPanelNode(nodeName, parentNode = null) {
    const initialSelector = parentNode && isSelector(parentNode) ? parentNode.parent(0).child("ul") : getComposerRightPanel();
    return initialSelector.find("span").withExactText(nodeName).parent("div.x-tree-node-el");
}
