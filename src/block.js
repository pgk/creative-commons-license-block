// Parcel seems to need these
import React from 'react';
import ReactDOM from 'react-dom';

/* global wp */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
    BlockControls,
} = wp.editor;


//  Import CSS.
import './style.scss';
import './editor.scss';

const getCCLogoSvg = () => {
	return (<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path d="M31.957,0.311c-8.682,0-16.322,3.213-22.226,9.203
		C3.653,15.678,0.354,23.666,0.354,32c0,8.422,3.212,16.236,9.29,22.313c6.078,6.078,13.978,9.377,22.313,9.377
		c8.334,0,16.409-3.299,22.66-9.463c5.904-5.817,9.029-13.544,9.029-22.227c0-8.595-3.125-16.408-9.116-22.399
		C48.453,3.523,40.639,0.311,31.957,0.311z M32.043,6.041c7.12,0,13.458,2.691,18.406,7.641c4.862,4.861,7.466,11.286,7.466,18.318
		c0,7.119-2.518,13.371-7.379,18.146c-5.123,5.035-11.721,7.727-18.493,7.727c-6.858,0-13.283-2.691-18.232-7.641
		C8.862,45.283,6.084,38.772,6.084,32c0-6.858,2.778-13.369,7.727-18.406C18.673,8.646,24.924,6.041,32.043,6.041z"/>
	<path id="c" d="M31.635,26.734c-1.79-3.264-4.844-4.563-8.389-4.563
		c-5.16,0-9.267,3.65-9.267,9.828c0,6.283,3.861,9.829,9.442,9.829c3.581,0,6.635-1.966,8.319-4.949l-3.931-2.001
		c-0.878,2.105-2.212,2.738-3.896,2.738c-2.914,0-4.248-2.422-4.248-5.617c0-3.193,1.124-5.616,4.248-5.616
		c0.842,0,2.527,0.456,3.51,2.563L31.635,26.734z"/>
	</svg>);
};

const ccLicenses = {
	'by-4.0': {
		'url': 'https://creativecommons.org/licenses/by/4.0/',
		'icon-compact': 'https://i.creativecommons.org/l/by/4.0/80x15.png',
		'icon-normal': 'https://i.creativecommons.org/l/by/4.0/88x31.png',
		'name': 'Creative Commons Attribution 4.0 International',
	},
	'by-sa-4.0': {
		'url': 'https://creativecommons.org/licenses/by-sa/4.0/',
		'icon-compact': 'https://i.creativecommons.org/l/by-sa/4.0/80x15.png',
		'icon-normal': 'https://i.creativecommons.org/l/by-sa/4.0/88x31.png',
		'name': 'Creative Commons Attribution-ShareAlike 4.0 International',
	},
	'by-nd-4.0':  {
		'url': 'https://creativecommons.org/licenses/by-nd/4.0/',
		'icon-compact': 'https://i.creativecommons.org/l/by-nd/4.0/80x15.png',
		'icon-normal': 'https://i.creativecommons.org/l/by-nd/4.0/88x31.png',
		'name': 'Creative Commons Attribution-NoDerivatives 4.0 International',
	},
	'by-nc-4.0': {
		'url': 'https://creativecommons.org/licenses/by-nc/4.0/',
		'icon-compact': 'https://i.creativecommons.org/l/by-nc/4.0/80x15.png',
		'icon-normal': 'https://i.creativecommons.org/l/by-nc/4.0/88x31.png',
		'name': 'Creative Commons Attribution-NonCommercial 4.0 International',
	},
	'by-nc-sa-4.0': {
		'url': 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
		'icon-compact': 'https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png',
		'icon-normal': 'https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png',
		'name': 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International',
	},
	'by-nc-nd-4.0':  {
		'url': 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
		'icon-compact': 'https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png',
		'icon-normal': 'https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png',
		'name': 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International',
	},
};

function renderCCLicense( data, compactIcon = false ) {
	const iconUrl = compactIcon ? data['icon-compact'] : data['icon-normal'];
	return (<div>
		<a rel="license" href={data.url}>
		<img alt="Creative Commons License" style={{borderWidth: 0}} 
			src={iconUrl} /></a><br />
		This work is licensed under a <a rel="license" href={data.url}>{data.name} License</a>.
			</div>);
}

const showLicense = ( { attributes } ) => {
	const selectedLicense = attributes.selectedLicense || 'by-4.0';
	const preferCompactIcon = attributes.compactIcon && attributes.compactIcon === true;
	console.log(selectedLicense);
        return renderCCLicense( ccLicenses[selectedLicense], preferCompactIcon );
};

/**
 * Register our block with the editor
 * 
 * The first argument is the name of the block. It must be in form of namespace/block-name with 
 * only letters, numbers, and hyphens. This is how the editor knows which block controls to use
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
registerBlockType( 'gutenberg-block-kit/creative-commons-license-block', {
    // This is the display title for your block, which can be translated with our translation 
    // functions. The block inserter will show this name.
    title: __( 'Creative Commons License' ),

    // This is a short description for your block, which can be translated with our translation 
    // functions. This will be shown in the block inspector.
    description: __( 'Add a Creative Commons License to your page' ),

    // Blocks are grouped into categories to help users browse and discover them.
    // The core provided categories are: common, formatting, layout, widgets, embed
    category: 'widgets',

    // An icon property should be specified to make it easier to identify a block. These can be any 
    // of WordPress’ Dashicons, or a custom svg element.
    // See https://developer.wordpress.org/resource/dashicons/
    icon: getCCLogoSvg(),

    // Sometimes a block could have aliases that help users discover it while searching. 
    // For example, an image block could also want to be discovered by photo. You can do so by 
    // providing an array of terms (which can be translated).
    keywords: [ __( 'glitch' ) ],

    attributes: {
        selectedLicense: {
            type: 'string',
            default: 'by-4.0'
        },
        compactIcon: {
          type: 'boolean',
          default: false,
        },
    },

    /**
     * The edit function describes the structure of your block in the context of the editor. This 
     * represents what the editor will render when the block is used.
     * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
     */
    edit: function ( { attributes, className, isSelected, setAttributes } ) {
	const selectedLicense = showLicense( { attributes } );
	const selectItems = Object.keys(ccLicenses).map((license) => {
		return (<option key={license} value={license} selected={license === selectedLicense}>{license}</option>)
	});
        function onChangeSelectedLicense( evt) {
		const newLicense  = evt.target.value;
        	setAttributes( { selectedLicense: newLicense === undefined ? 'by-4.0' : newLicense } );
        }
	function onToggleCompact( evt) {
		const isCompact = evt.target.checked;
        	setAttributes( { compactIcon: isCompact } );
        }

        return [
		(<BlockControls key="controls">
			<label>License:</label>
			<div>
			  <select onChange={onChangeSelectedLicense}>
			    {selectItems}
			  </select>
			</div>
			<label>Compact?</label>
			<input type="checkbox" value={attributes.compactIcon} onChange={onToggleCompact} />
		</BlockControls>),
		(<div key="output" className={className}>
		{selectedLicense}
            </div>)];

    },

    /**
     * The save function defines the way in which the different attributes should be combined into 
     * the final markup, which is then serialized by Gutenberg into post_content.
     * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
     */
    save: function ( { attributes } ) {
        return showLicense( { attributes } );
    }
} );
