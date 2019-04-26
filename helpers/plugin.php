<?php

/**
 * Enqueue assets for editor portion of Gutenberg
 */
function plugin_editor_assets() {
	// Files.
	$block_path = 'build/index.js';
	$block_css = 'editor.css';
	// Block.
	wp_enqueue_script(
		'juxtapose-block-js',
		plugins_url( $block_path, __FILE__ ),
		[ 'wp-blocks', 'wp-editor', 'wp-element', 'wp-components' ],
		filemtime( plugin_dir_path( __FILE__ ) . $block_path )
	);
	// Editor CSS.
	wp_enqueue_style(
		'juxtapose-block-css',
		plugins_url( $block_css, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $block_css )
	);
}
add_action( 'enqueue_block_editor_assets', 'plugin_editor_assets' );
/**
 * Enqueue assets for viewing juxtapose images
 */
function plugin_view_assets() {
	// Files.
	$juxtapose_js = '/assets/juxtapose/juxtapose.js';
	$juxtapose_css = '/assets/juxtapose/juxtapose.css';
	// Enqueue Juxtapose style.
	wp_enqueue_style(
		'juxtapose-css',
		plugins_url( $juxtapose_css, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $juxtapose_css )
	);
	// Enqueue Juxtapose JS.
	wp_enqueue_script(
		'juxtapose-js',
		plugins_url( $juxtapose_js, __FILE__ ),
		[ 'wp-dom-ready' ], // No dependencies.
		filemtime( plugin_dir_path( __FILE__ ) . $juxtapose_js ),
		true // In footer.
	);
}
add_action( 'enqueue_block_assets', 'plugin_view_assets' );
