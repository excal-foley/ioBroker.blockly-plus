#!/usr/bin/env python3
# this take all js-file-path from './', './blocks' and './blocks/msg'
# and links it to javascript.admin/tab.html and Sandbox
import fileinput, re, glob, os, getopt, sys

# Get full command-line arguments
full_cmd_arguments = sys.argv

# Keep all but the first
argument_list = full_cmd_arguments[1:]

# TODO: help curently not defined
short_options = 'datlho:'
long_options = ['delete', 'all', 'test', 'live', 'help', 'output=']

try:
    arguments, values = getopt.getopt(argument_list, short_options, long_options)
except getopt.error as err:
    # Output error, and return with an error code
    print (str(err))
    sys.exit(2)


# defined html-file-path
html_name = 'tab.html'
html_dir = os.path.abspath('../../') # ../../ = javascript.admin
html_path = os.path.join(html_dir, html_name)

# html code
html_js_code = '<script type="text/javascript" src="%%%%"></script>'

# defined js-file-path
this_path = os.getcwd()
relative_js_path = os.path.relpath(this_path, html_dir)

# get all js-files and adds them as html-code to code_for_insert
code_for_insert = ''
js_paths = ['*.js', 'blocks/*.js', 'blocks/msg/*.js']
for js_path in js_paths:
    for file in glob.glob(js_path): #'**/*.js', recursive=True
        code_for_insert += html_js_code.replace('%%%%', os.path.join(relative_js_path, file))
        print('    '+file)

code_for_insert_sanbox = re.sub('"google-blockly', '"../../google-blockly', code_for_insert, flags=re.M)

# create ".bak2" backup-file, if ".bak" already exist
if os.path.isfile(html_path+'.bak'):
    bak = '.bak2'
else:
    bak = '.bak'

def insert_code(code, path, backup=''):
    code_marker_start = '<!--start custom blocks-->'
    code_marker_end = '<!--end custom blocks-->'
    search_regex = '(?:(<\/script>)\\s*(<style>))|(?:{}.*{})'.format(code_marker_start, code_marker_end)
    if code == '':
        replace_regex = ''
    else:
        replace_regex = r'\1{}{}{}\2'.format(code_marker_start, code, code_marker_end)
    with fileinput.FileInput(path, inplace=True, backup=backup) as file:
        for line in file:
            print(re.sub(search_regex, replace_regex, line, flags=re.M), end='')


# set "-a" as default parameter
if len(arguments) == 0:
    arguments = [('-a', '')]

# Evaluate given options
liveIsDelete = testIsWrite = liveIsWrite = False
for current_argument, current_value in arguments:
    if current_argument in ('-h', '--help'):
        print ('Displaying help')
    elif current_argument in ('-o', '--output'):
        print (('Enabling special output mode (%s)') % (current_value))
    elif current_argument in ('-d', '--delete'):
        insert_code('', html_path)
        liveIsDelete = True
        print('\n Links delete')
    if current_argument in ('-t', '--test', '-a', '--all'):
        #print ('Write test-system')
        insert_code(code_for_insert_sanbox, 'sandbox.html')
        testIsWrite = True
    if current_argument in ('-l', '--live', '-a', '--all'):
        #print ('Write live-system')
        insert_code(code_for_insert, html_path, bak)
        liveIsWrite = True

if testIsWrite or liveIsWrite:
    print('\n Write successful')
if liveIsWrite or liveIsDelete:
    print(' \033[0;31;47mPlease reboot system now!\033[0;37;40m \n')
