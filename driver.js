'use strict';

/**
 * Driver module
 * Monitors the system for events
 * on pickup:
 *  wait 1 second and log “DRIVER: picked up [ORDER_ID]”
 *  emit "in-transit" with the payload
 * 
 * wait 3 seconds
 *  log "delivered" to the console
 *  emit "delivered" with the payload
 */

