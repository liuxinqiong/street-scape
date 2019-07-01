import React from 'react';
import styles from './Bar.module.scss';

interface PropsType {
  className?: string;
  style: Object;
}

export default function(props: PropsType) {
  return (
    <div className={`${props.className} ${styles.bar}`} style={props.style} />
  );
}
