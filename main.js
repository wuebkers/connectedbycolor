// dependencies
import $ from 'jquery';
import { Luminous } from "luminous-lightbox";


// polyfills
import '@common/polyfills';

// common
import { FireDetect, FireComponentRecord } from '@common';

/**
 * @type function
 * @name onPageReady
 * @description
 *
 * Initialize scripts when page is ready
 *
 **/
const onPageReady = () => {
  const detect = new FireDetect();
  detect.setHtmlClasses();

  // lazy loads elements with default selector: `.lozad`
  const observer = lozad('.lozad', {
    loaded: function(el) {
      el.classList.add('lozad--loaded');
    },
  });
  observer.observe();

  const componentRecord = new FireComponentRecord();
  componentRecord.registerAll();

  Drupal.behaviors.fireGlobal = {
    attach: (context, settings) => {
      if ($(context).hasClass('views-exposed-form')) {
        componentRecord.registerAll();
        observer.observe();
      }
    },
  };
};

// fire all scripts
$(document).ready(onPageReady);
