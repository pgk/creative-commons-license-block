/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */
import './common.scss';
import './block/block.js';

/* global wp */
wp.data.dispatch( 'core/editor' ).insertBlock( wp.blocks.createBlock( 'cgb/block-my-block', {} ) );
wp.data.dispatch( 'core/editor' ).resetEditorBlocks( wp.data.select( 'core/editor' ).getBlocks() );
