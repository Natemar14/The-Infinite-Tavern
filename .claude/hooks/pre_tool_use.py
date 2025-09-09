#!/usr/bin/env python3
import sys
import json
import logging

def validate_tool_use(tool_name, tool_input):
    """Validate tool usage before execution"""
    dangerous_commands = ['rm -rf', 'drop database', 'delete from']
    
    if tool_name == 'shell':
        command = tool_input.get('command', '').lower()
        for dangerous in dangerous_commands:
            if dangerous in command:
                logging.error(f"Blocked dangerous command: {command}")
                sys.exit(1)
    
    return True

if __name__ == "__main__":
    # Parse tool information
    tool_info = json.loads(sys.stdin.read())
    validate_tool_use(tool_info['tool_name'], tool_info['tool_input'])
