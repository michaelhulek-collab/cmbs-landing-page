import React from 'react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  clinic: string;
}

export interface NavItem {
  label: string;
  href: string;
}