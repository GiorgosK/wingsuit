import { RenderTwig } from '@wingsuit-designsystem/storybook';
import React from 'react';

export default { title: '03-organisms/Footer' };

const twigTemplate = require('./footer.twig');

export const Footer = () => <RenderTwig data={twigTemplate}></RenderTwig>;
