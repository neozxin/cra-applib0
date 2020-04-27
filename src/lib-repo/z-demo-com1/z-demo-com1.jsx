import React from 'react';
//import './z-demo-com1.scss';

// utils
const componentUtils = {
  toPascalCase(text) {
    function clearAndUpper(text) {
      return text.replace(/-/, '').toUpperCase();
    }
    return text.replace(/(^\w|-\w)/g, clearAndUpper);
  },
  getFinalProps: ({ defaultPropCreators = {}, props = {} } = {}) => {
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
      ...props,
    };
  },
  createFunctionComponent: (optMap = {}, defaultPropCreators = {}) => {
    const optMapClassName =
      typeof optMap === 'string' ? optMap : optMap.className;
    function fn(props = {}) {
      const finalProps = componentUtils.getFinalProps({
        defaultPropCreators,
        props,
      });
      const getUtils = () => {
        const { typeid = `defaultType`, className = `` } = finalProps;
        const elProps = {
          className: `${optMapClassName || '--base-com'} ${className}`,
          'data-typeid': typeid,
        };
        return { elProps, typeid };
      };
      return finalProps.render(finalProps, getUtils);
    }
    return Object.assign(fn, {
      __comName: componentUtils.toPascalCase(optMapClassName),
    });
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
