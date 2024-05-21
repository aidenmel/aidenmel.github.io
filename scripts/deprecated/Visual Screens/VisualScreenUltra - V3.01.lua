--[[

    Visual Screens ULTRA | CoreScripts
    A all new way to elevate your visual experience.
    
    
    [Warning] This file is not accessible for the public eye. Any attempts to steal, 
    reproduce, or copy code directly below will result in proper moderation 
    procauations and immediate removal of all licensed products.


    | Developed by
    | iVastz

    | Published by Techo Incorporated
    | Lasted updated 9/23/23
    
]]--

-- Variables

    local BaseFolder = script.Parent.Parent

    -- Modules
    local SettingsModule = require(BaseFolder:WaitForChild('Settings'))
    local LoadModule = nil

    -- Services
    local HTTPService = game:GetService("HttpService")
    
-- Events
local HTTPServiceRequest = true -- test for now

if HTTPServiceRequest == 'Accepted' then
   LoadModule.LoadVSU()
end