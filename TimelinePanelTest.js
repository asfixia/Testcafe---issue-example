import * as MapSelectors from './MapSelectors.js';

fixture `TimelinePanel Test`
    .page `https://maps.csr.ufmg.br/calculator/?visiblelayers=0&queryid=82`

test
    .before(MapSelectors.closeIntroJs)
    ('Timeline panel visibility control should work', async t => {
        const landUseLayerName = "Land Use (1992 to 2015)";
        const layerContainer = MapSelectors.getLeftLayerPanel();
        const landUseTopNode = MapSelectors.getTopNode("Land use");
        const landUseTopNodeLeaf = MapSelectors.getTopNodeLeaf(landUseLayerName, landUseTopNode);
        const landUseLeftNode = MapSelectors.getLeftPanelLayerNode(landUseLayerName);
        const toggleLayerVisibilityButton = MapSelectors.getLeftPanelLayerButton(landUseLayerName, MapSelectors.BUTTONS.TOGGLE_VISIBILITY);
        const queryParametersButton = MapSelectors.getLeftPanelLayerButton(landUseLayerName, MapSelectors.BUTTONS.QUERY_PARAMETERS);
        const timelineCustomButton = MapSelectors.getLeftPanelLayerButton(landUseLayerName, MapSelectors.BUTTONS.TIMELINE);
        const timelinePanel = MapSelectors.getTimelinePanel(landUseLayerName);
        await t
            .expect(layerContainer.visible).notOk()
            .hover(landUseTopNode)
            .click(landUseTopNodeLeaf)
            .expect(layerContainer.visible).ok()
            .expect(timelinePanel.visible).ok()
            .click(toggleLayerVisibilityButton)
            .expect(timelinePanel.visible).notOk()
            .expect(timelineCustomButton.visible).notOk()
            .click(queryParametersButton)
            .expect(timelineCustomButton.visible).ok()
            .click(timelineCustomButton)
            .expect(timelinePanel.visible).notOk()
            .click(toggleLayerVisibilityButton)
            .expect(timelinePanel.visible).ok()
            .click(timelineCustomButton)
            .expect(timelinePanel.visible).notOk()
            .click(toggleLayerVisibilityButton)
            .expect(timelinePanel.visible).notOk()
            .expect(timelineCustomButton.visible).notOk()
            .click(toggleLayerVisibilityButton)
            .expect(timelineCustomButton.visible).ok()
            .click(timelineCustomButton)
            .expect(timelinePanel.visible).ok()
            .click(toggleLayerVisibilityButton)
            .expect(timelinePanel.visible).notOk()
    });
