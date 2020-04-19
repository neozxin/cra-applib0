import React from 'react';
//import './z-demo-com1.scss';

// utils
const componentUtils = {
  getFinalProps: ({ props, defaultPropCreators }) => {
    return {
      ...Object.entries(defaultPropCreators)
        .filter((entry) => typeof props[entry[0]] === 'undefined')
        .reduce(
          (defaultProps, entry) => ({
            ...defaultProps,
            [entry[0]]: entry[1](),
          }),
          {}
        ),
      ...Object.entries(props)
        .filter((entry) => typeof props[entry[0]] !== 'undefined')
        .reduce((props, entry) => ({ ...props, [entry[0]]: entry[1] }), {}),
    };
  },
  createFunctionComponent: (defaultPropCreators) => (props) => {
    const finalProps = componentUtils.getFinalProps({
      props,
      defaultPropCreators,
    });
    return finalProps.render(finalProps);
  },
};

// configs
const demoConfigs = {
  getZDemoCom1Config: () => {
    return {
      displayName: 'non default display name',
    };
  },
};

// ZDemoCom1
const ZDemoCom1 = componentUtils.createFunctionComponent({
  config: () => demoConfigs.getZDemoCom1Config(),
  render: () => (props) => {
    const { className = '', data, config } = props;
    const elProps = { className: `z-demo-com1 ${className}` };
    if (!data || !config) return <div {...elProps}>Invalid Props</div>;
    return (
      <div {...elProps} title={JSON.stringify(config)}>
        {typeof props.children === 'function'
          ? props.children(props)
          : props.children}
      </div>
    );
  },
});

export const myZDemoCom1 = (
  <ZDemoCom1 data={'testData'}>
    {(p) => <div>final props: {JSON.stringify(p)}</div>}
  </ZDemoCom1>
);
export default ZDemoCom1;
