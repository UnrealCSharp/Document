import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'C#',
    description: (
      <>
        C#是一种简单、高效、面向对象且类型安全的编程语言，它是游戏开发中最常用的编程语言。
      </>
    ),
  },
  {
    title: '动态类',
    description: (
      <>
        通过C#可以动态生成UClass，UInterface，UStruct和UEnum，并且不需要蓝图载体。
      </>
    ),
  },
  {
    title: '灵活高效',
    description: (
      <>
        反射类型全支持，自动生成C#代码，能够静态导出各种数据类型和函数。
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
