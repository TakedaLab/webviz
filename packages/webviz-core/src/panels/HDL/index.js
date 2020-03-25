// @flow
//
//  Copyright (c) 2018-present, Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.
import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from "styled-components";

import TextContent from "../../components/TextContent";
import Panel from "webviz-core/src/components/Panel";
import PanelToolbar from "webviz-core/src/components/PanelToolbar";

// HDL Test Panel
const Container = styled.div`
  padding: 16px;
  overflow-y: auto;
  ul {
    font-size: 10px;
    margin-left: 8px;
  }
  li {
    margin: 4px 0;
  }
  h1 {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }
  section {
    flex: 1 1 50%;
    overflow: hidden;
  }
`;

function HDLTestPanel(): React.Node {
  return (
    <Container>
      <PanelToolbar floating />
      <h1>HDL Test Panel</h1>
      <TextContent>This is a test panel.</TextContent>
    </Container>
  );
}

HDLTestPanel.panelType = "HDLPanel";
HDLTestPanel.defaultConfig = {};

export default hot(Panel<{}>(HDLTestPanel));
