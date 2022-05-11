/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Designed For Developers',
    Svg: require('../../static/img/60e63e8c40f27c7c73def81f_Online storage_Monochromatic.svg').default,
    description: (
      <>
        Data security for your software that doesn't require having a PHD in cryptography.
        Ship without being blocked by security reviews.
      </>
    ),
  },
  {
    title: 'Powerful Security Features',
    Svg: require('../../static/img/60e63e8c40f27c84c0def803_Analytics process_Monochromatic.svg').default,
    description: (
      <>
        Remove sensitive data from your database with tokenization,
        centralize all of your authorization checks,
        add end-to-end encryption from your front-end to your backend,
        add zero-trust computation to your backend, and more.
      </>
    ),
  },
  {
    title: 'Designed by Security Engineers',
    Svg: require('../../static/img/60e63e8c40f27c3024def81b_Information flow_Monochromatic.svg').default,
    description: (
      <>
        We built and designed LunaSec from years of experience helping developers write secure production software.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
