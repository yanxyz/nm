param(
    [string]$command = 'build',

    [alias("f")]
    [switch]$Force,

    [alias("w")]
    [switch]$Watch
)

function GetArgs() {
    return @('exec', 'jekyll', $command,
        '--config', '_config.yml,_config-preview.yml',
        '--incremental')
}

function build() {
    if ($Force) {
        bundle exec jekyll clean
    }

    $allArgs = GetArgs
    if (-not $Watch) {
        bundle $allArgs
        return
    }

    $allArgs += '--watch'
    bundle $allArgs
}

build
